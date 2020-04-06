import compression from "compression";
import express from "express";
import http from "http";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import socket from "socket.io";

import routes from "./routes";
import { logger } from "./util";

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;
const apiLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: "API rate limit exceeded!",
});

const app = express();
app.set("trust proxy", 1);
app.set("port", port);
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

const server = http.createServer(app).listen(app.get("port"), function() {
  logger.info(
    `Server is running on http://localhost:${port} in ${NODE_ENV} mode`,
  );
});

const io = socket.listen(server);
io.sockets.on("connection", () => {
  logger.info("User connected");
});
