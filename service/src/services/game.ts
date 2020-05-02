import { socket } from "../server";
import { setPlayerActiveStatus } from "../api/games/repository";
import { playerOutputSanitization } from "../util";

const playerConnected = async (gameId: string, playerId: string) => {
  try {
    const player = await setPlayerActiveStatus(gameId, playerId, true);
    socket.to(gameId).emit("player_set_active", playerOutputSanitization(player));
  } catch (e) {}
};

const playerDisconnected = async (gameId: string, playerId: string) => {
  try {
    const player = await setPlayerActiveStatus(gameId, playerId, false);
    socket.to(gameId).emit("player_set_inactive", playerOutputSanitization(player));
  } catch (e) {}
};

export { playerConnected, playerDisconnected };
