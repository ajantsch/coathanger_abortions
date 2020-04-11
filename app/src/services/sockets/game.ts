import io from "socket.io-client";

const { SOCKET_URL } = process.env;

const connectToGame = (gameId: string, playerName: string): Promise<SocketIOClient.Socket> => {
  return new Promise(resolve => {
    const gameSocket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}/${gameId}`);
    gameSocket.on("connect", () => {
      gameSocket.emit("player_connected", `Player ${playerName} now has a socket connection to game ${gameId}`);
      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
