import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const app = new Hono();
import { decode, sign, verify } from "hono/jwt";
import { signupinput, signininput } from "../../../common/src/zod";
export const userrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
userrouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  let body = await c.req.json();
  const parsed = signupinput.safeParse(body);
  if (!parsed.success) {
    return c.json({
      error: "Your inputs are not valid",
      details: parsed.error.issues,
    });
  } else {
    let user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      token,
    });
  }
});

userrouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    let body = await c.req.json();
    let parsed = signininput.safeParse(body);

    if (!parsed.success) {
      return c.json({
        error: "Invalid inputs",
      });
    } else {
      let user = await prisma.user.findUnique({
        where: {
          email: body.username,
          password: body.password,
        },
      });

      if (!user) {
        return c.json({
          msg: "User not found",
        });
      }

      let jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    }
  } catch (error) {
    return c.json({
      msg: "Error while running the database",
    });
  }
});
