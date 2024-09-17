import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Jwt } from "hono/utils/jwt";
import { createbloginput, updatebloginput } from "../../../common/src/zod";
export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogrouter.use("/*", async (c, next) => {
  try {
    const authheader = c.req.header("Authorization") || "";
    const user = (await verify(authheader, c.env.JWT_SECRET)) as { id: string };
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(411);
      c.json({
        msg: "you are not loged in",
      });
    }
  } catch (error) {
    c.json({
      error: "verify error",
    });
  }
});

blogrouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let body = await c.req.json();
  let parsed = createbloginput.safeParse(body);
  if (!parsed.success) {
    c.status(400);
    c.json({
      error: "invalid inputs",
    });
  } else {
    let authorId = c.get("userId");
    let blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: blog.id,
    });
  }
});
blogrouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let body = await c.req.json();
  let parsed = updatebloginput.safeParse(body);
  if (!parsed.success) {
    c.status(400);
    c.json({
      error: "invalid inputs",
    });
  } else {
    let blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  }
});
blogrouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  let blog = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({
    blog,
  });
});
blogrouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    let id = await c.req.param("id");
    let blog = await prisma.blog.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
    return c.json({
      blog
    });
  } catch (error) {
    c.status(411);
    return c.json({
      msg: "error while connecting to db",
    });
  }
});
