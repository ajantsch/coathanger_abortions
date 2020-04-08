import { DefaultRouter } from "../routers";
import { getGame, postGame, putGamePlayer, getGamePlayer } from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);
router.put("/:game_id/player/:player_id", getGamePlayer);

export default router;
