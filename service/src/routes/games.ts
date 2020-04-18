import { DefaultRouter } from "../routers";
import {
  getGame,
  postGame,
  putGamePlayer,
  getGamePlayer,
  getQuestionCard,
  putAnswerCard,
  patchRevealAnswers,
  postWinningAnswer,
  putNewRound,
} from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);
router.get("/:game_id/player/:player_id", getGamePlayer);
router.get("/:game_id/draw/question", getQuestionCard);
router.put("/:game_id/answer", putAnswerCard);
router.put("/:game_id/round/start", putNewRound);
router.patch("/:game_id/round/reveal", patchRevealAnswers);
router.post("/:game_id/round/winner", postWinningAnswer);

export default router;
