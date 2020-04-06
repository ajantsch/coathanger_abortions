import compression from "compression";
import express from "express";
import helmet from "helmet";
import RateLimit from "express-rate-limit";

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

app.listen(port, () => {
  logger.info(
    `Server is running on http://localhost:${port} in ${NODE_ENV} mode`,
  );
});
