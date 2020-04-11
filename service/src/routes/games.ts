import { DefaultRouter } from "../routers";
import {
  getGame,
  postGame,
  putGamePlayer,
  getGamePlayer,
  getQuestionCard,
  putAnswerCard,
} from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);
router.get("/:game_id/player/:player_id", getGamePlayer);
router.get("/:game_id/draw/question", getQuestionCard);
router.put("/:game_id/answer", putAnswerCard);

export default router;
