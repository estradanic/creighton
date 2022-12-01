import express from "express";
import {JsonDB, Config} from "node-json-db";

const app = express();
const db = new JsonDB(new Config("db", true, false, '/'));

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

export const handler = app;
