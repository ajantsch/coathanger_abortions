import compression from "compression";
import express from "express";
import http from "http";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import socketio from "socket.io";

import routes from "./routes";

const apiLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: "API rate limit exceeded!",
});

const app = express();
app.set("trust proxy", 1);
app.use("/api/", apiLimiter);
app.use(helmet());
app.use(compression());
app.use("/health", (_req, res) => {
  res.status(200);
  res.type("json");
  res.send({ status: "OK" });
  res.end();
});

app.use("/api/games/", routes.games);

const server = http.createServer(app);
const socket = socketio(server, { pingTimeout: 7000, pingInterval: 3000, cookie: false });

export { server, socket };
