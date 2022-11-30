import fs from "node:fs/promises"
import express from "express"
import { generateHydrationScript } from "solid-js/web"
import {JsonDB, Config} from "node-json-db";

// Constants
const isProduction = process.env.NODE_ENV === "production"
const port = process.env.PORT || 5173
const base = process.env.BASE || "/"

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : ""
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined

// Create http server
const app = express()

// Create database
const db = new JsonDB(new Config("db", true, false, '/'));

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import("vite")
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import("compression")).default
  const sirv = (await import("sirv")).default
  app.use(compression())
  app.use(base, sirv("./dist/client", { extensions: [] }))
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/observations", async (_, res) => {
  try {
    const observations = await db.getData("/observations");
    res.json(observations ?? []);
  } catch (e) {
    res.json([]);
  }
});

app.post("/existing-observation", async (req, res) => {
  let observations = [];
  try {
    observations = await db.getData("/observations");
  } catch {}
  const newObservations = [
    ...(observations.filter((observation) => observation.id !== req.body.id)),
    req.body
  ];
  await db.push("/observations", newObservations);
  res.redirect("/");
});

app.post("/new-observation", async (req, res) => {
  let observations = [];
  try {
    observations = await db.getData("/observations");
  } catch {}
  const newObservations = [...observations, req.body];
  await db.push("/observations", newObservations);
  res.redirect("/");
});

app.post("/delete-observation", async (req, res) => {
  let observations = [];
  try {
    observations = await db.getData("/observations");
  } catch {}
  const newObservations = observations.filter((observation) => observation.id !== req.body.id);
  await db.push("/observations", newObservations);
  res.redirect("/");
});

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "")

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8")
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render
    } else {
      template = templateHtml
      render = (await import("./dist/server/entry-server.js")).render
    }

    const rendered = await render(url, ssrManifest)

    const head = (rendered.head ?? "") + generateHydrationScript()

    const html = template
      .replace(`<!--app-head-->`, head)
      .replace(`<!--app-html-->`, rendered.html ?? "")

    res.status(200).set({ "Content-Type": "text/html" }).end(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
