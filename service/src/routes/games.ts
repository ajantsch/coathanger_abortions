import { DefaultRouter } from "../routers";
import { postGame, putGamePlayer } from "../api/games";

const router = DefaultRouter();
router.post("/", postGame);
router.put("/:game_id/player", putGamePlayer);

export default router;
