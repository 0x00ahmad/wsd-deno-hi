import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { addFeedback, getFeedbackCount } from "./feedbacks.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates` });
const app = new Hono();

app.get("/", async (c) => {
  const template = await eta.render("index.eta", {});
  return c.html(template);
});

app.post("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  await addFeedback(id);
  return c.redirect("/");
});

app.get("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  const count = await getFeedbackCount(id);
  return c.text(`Feedback ${id}: ${count}`);
});

export default app;
