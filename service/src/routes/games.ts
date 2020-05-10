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
  getCurrentRound,
  putNewRound,
  getAnswer,
  patchReplaceCard,
  patchPlayerActive,
  patchPlayerInactive,
  deleteGamePlayer,
} from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);
router.get("/:game_id/player/:player_id", getGamePlayer);
router.delete("/:game_id/player/:player_id", deleteGamePlayer);
router.get("/:game_id/round/", getCurrentRound);
router.put("/:game_id/round/", putNewRound);
router.patch("/:game_id/round/question", patchRevealQuestion);
router.put("/:game_id/answer", putAnswer);
router.patch("/:game_id/round/answers", patchRevealAnswers);
router.post("/:game_id/round/winner", postWinningAnswer);
router.get("/:game_id/player/:player_id/card", getAnswer);
router.patch("/:game_id/player/:player_id/card", patchReplaceCard);
router.patch("/:game_id/player/:player_id/active", patchPlayerActive);
router.patch("/:game_id/player/:player_id/inactive", patchPlayerInactive);

export default router;
