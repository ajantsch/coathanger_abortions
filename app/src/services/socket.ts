import io from "socket.io-client";

import actions from "../actions";
import store from "../store";
import { IRound, IRemotePlayer, IGivenAnswer } from "../interfaces";

const { SOCKET_URL } = process.env;

const connectToGame = (gameId: string, playerName: string): Promise<SocketIOClient.Socket> => {
  return new Promise(resolve => {
    const gameSocket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}/${gameId}`);
    gameSocket.on("connect", () => {
      gameSocket.emit("player_connected", `Player ${playerName} now has a socket connection to game ${gameId}`);

      gameSocket.on("player_joined", (player: IRemotePlayer) => {
        console.warn("Player joined:", player);
        store.dispatch(actions.remotePlayerJoined(player));
      });

      gameSocket.on("new_round_started", (round: IRound) => {
        console.warn("New round started:", round);
        store.dispatch(actions.roundReceived(round));
      });

      gameSocket.on("question_card_revealed", () => {
        console.warn("Question card revealed.");
        store.dispatch(actions.questionRevealed());
      });

      gameSocket.on("answer_card_given", (answer: IGivenAnswer) => {
        console.warn("Answer card given:", answer);
        store.dispatch(actions.answerReceived(answer));
      });

      gameSocket.on("answers_revealed", (round: IRound) => {
        console.warn("Answers revealed:", round);
        store.dispatch(actions.answersRevealed(round));
      });

      gameSocket.on("round_winner_set", (winner: IGivenAnswer) => {
        console.warn("Winner of the round:", winner);
        store.dispatch(actions.winnerReceived(winner));
      });

      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
