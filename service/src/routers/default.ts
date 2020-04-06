import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const DefaultRouter = () => {
  const router = express.Router({ mergeParams: true });
  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  return router;
};

export default DefaultRouter;
