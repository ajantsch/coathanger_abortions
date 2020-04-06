import { DefaultRouter } from "../routers";
import { getGame, postGame, putGamePlayer } from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.get("/:game_id", getGame);
router.put("/:game_id/player", putGamePlayer);

export default router;
