/* eslint-disable no-undef */
"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path1 = __importDefault(require("path"));
const frontendRoutes = [
  "login",
  "observations",
  "chart",
  "",
];
app.enable("trust proxy");
app.use((req, res, next) => {
  req.secure || app.get("X-Forwarded-Proto") !== "http"
    ? next()
    : res.redirect("https://" + req.headers.host + req.url);
});
app.use((req, res, next) => {
  const pathParts = req.path.split("/").filter((pathPart) => pathPart !== "");
  const serveIndex = req.method === "GET" &&
        (frontendRoutes.includes(pathParts[0]) || pathParts.length === 0);
  if (serveIndex) {
    res.sendFile(path1.default.join(__dirname, "public/index.html"));
  } else {
    next();
  }
});
