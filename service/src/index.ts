const { NODE_ENV, PORT } = process.env;

import bodyParser from "body-parser";
import compression from "compression";
import express, { Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import RateLimit from "express-rate-limit";

const app = express();

// allow proxy
app.set("trust proxy", 1);

// api rate limiting
const apiLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: "API rate limit exceeded!",
});

app.use("/api/", apiLimiter);

// app middlewares
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

// unprotected path for healthcheck
app.use("/health", (_req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT} in ${NODE_ENV}`);
});
