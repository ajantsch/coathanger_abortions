import { server, socket } from "./server";
import { logger } from "./util";

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;

server.listen(port, function() {
  logger.info(`Server is running on http://localhost:${port} in ${NODE_ENV} mode`);
});

socket.on("connection", () => {
  logger.info("Client socket connection established");
});
