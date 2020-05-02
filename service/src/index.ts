import { server, socket } from "./server";
import { logger } from "./util";

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;

server.listen(port, function() {
  logger.info(`Server is running on http://localhost:${port} in ${NODE_ENV} mode`);
});

socket.on("connection", socket => {
  const gameId = socket.handshake.query.gameId;
  const playerId = socket.handshake.query.playerId;

  socket.join(gameId, () => {
    logger.info(`Socket connection for player ${playerId} to game ${gameId} established.`);

    socket.on("disconnect", () => {
      logger.warn(`Socket connection for player ${playerId} to game ${gameId} closed.`);
    });
  });
});
