import io from "socket.io-client";

import actions from "../actions";
import store from "../store";
import { IRound, IRemotePlayer, IGivenAnswer } from "../interfaces";

const { SOCKET_URL } = process.env;

const connectToGame = (gameId: string, playerId: string): Promise<SocketIOClient.Socket> => {
  console.warn(gameId, playerId);
  return new Promise(resolve => {
    const gameSocket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}`, {
      query: { gameId, playerId },
    });
    gameSocket.on("connect", () => {
      gameSocket.emit("player_connected", `${playerId} now has a socket connection to game ${gameId}`);

      gameSocket.on("player_joined", (player: IRemotePlayer) => {
        console.warn("Player joined:", player);
        store.dispatch(actions.remotePlayerJoined(player));
      });

      gameSocket.on("player_set_active", (player: IRemotePlayer) => {
        console.warn("Player set active:", player);
        store.dispatch(actions.remotePlayerActive(player));
      });

      gameSocket.on("player_set_inactive", (player: IRemotePlayer) => {
        console.warn("Player set inactive:", player);
        store.dispatch(actions.remotePlayerInactive(player));
      });

      gameSocket.on("player_removed", (playerId: string) => {
        console.warn("Player removed:", playerId);
        store.dispatch(actions.remotePlayerRemoved(playerId));
      });

      gameSocket.on("new_round_started", (round: IRound) => {
        console.warn("New round started:", round);
        actions.roundReceived(round)(store.dispatch, store.getState, undefined);
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
        actions.winnerReceived(winner)(store.dispatch, store.getState, undefined);
        actions.assignWinningCard(winner)(store.dispatch, store.getState, undefined);
      });

      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
