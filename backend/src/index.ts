import { Hono } from "hono";
//database - postgresql://neondb_owner:i8If6XFCxtKE@ep-orange-cloud-a5w9ni5a.us-east-2.aws.neon.tech/medium?sslmode=require

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const app = new Hono();
import { decode, sign, verify } from "hono/jwt";
import { userrouter } from "./routes/user";
import { blogrouter } from "./routes/blogs";
import { cors } from "hono/cors";
// app.use("/api/v1/blog/*", async (c, next) => {
//   const header = c.req.header("Authorization" || "");
//   let token = header?.split(" ")[1];
//   //@ts-ignore
//   let response = await verify(token, c.env.JWT_SECRET);
//   if (response.id) {
//     next();
//   } else {
//     return c.json({
//       error: "unauthorized",
//     });
//   }
// });
app.use("/*", cors());
app.route("/api/v1/user", userrouter);
app.route("/api/v1/blog", blogrouter);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
//POST /api/v1/user/signup

export default app;
