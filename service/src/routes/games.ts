import { DefaultRouter } from "../routers";
import {
  getGame,
  postGame,
  putGamePlayer,
  getGamePlayer,
  putAnswer,
  patchRevealQuestion,
  patchRevealAnswers,
  postWinningAnswer,
  getNewRound,
} from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);
router.get("/:game_id/player/:player_id", getGamePlayer);
router.get("/:game_id/round/", getNewRound);
router.patch("/:game_id/round/question", patchRevealQuestion);
router.put("/:game_id/answer", putAnswer);
router.patch("/:game_id/round/answers", patchRevealAnswers);
router.post("/:game_id/round/winner", postWinningAnswer);

export default router;
