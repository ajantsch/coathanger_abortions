import io from "socket.io-client";

import actions from "../actions";
import store from "../store";
import { IRound, IRemotePlayer, IGivenAnswer } from "../interfaces";

const { SOCKET_URL } = process.env;

const connectToGame = (gameId: string, playerId: string): Promise<SocketIOClient.Socket> => {
  return new Promise(resolve => {
    const gameSocket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}`, {
      query: { gameId, playerId },
    });
    gameSocket.on("connect", () => {
      gameSocket.emit("player_connected", `${playerId} now has a socket connection to game ${gameId}`);

      gameSocket.on("player_joined", (player: IRemotePlayer) => {
        console.info("Player joined:", player);
        store.dispatch(actions.remotePlayerJoined(player));
        store.dispatch(actions.showNotification(`Player joined: ${player.name}`));
      });

      gameSocket.on("player_set_active", (player: IRemotePlayer) => {
        console.info("Player set active:", player);
        store.dispatch(actions.remotePlayerActive(player));
      });

      gameSocket.on("player_set_inactive", (player: IRemotePlayer) => {
        console.info("Player set inactive:", player);
        store.dispatch(actions.remotePlayerInactive(player));
      });

      gameSocket.on("player_removed", (playerId: string) => {
        console.warn("Player removed:", playerId);
        store.dispatch(actions.remotePlayerRemoved(playerId));
      });

      gameSocket.on("new_round_started", (round: IRound) => {
        console.info("New round started:", round);
        actions.roundReceived(round)(store.dispatch, store.getState, undefined);
      });

      gameSocket.on("question_card_revealed", () => {
        console.info("Question card revealed.");
        store.dispatch(actions.questionRevealed());
      });

      gameSocket.on("answer_card_given", (answer: IGivenAnswer) => {
        console.info("Answer card given:", answer);
        store.dispatch(actions.answerReceived(answer));
      });

      gameSocket.on("answers_revealed", (round: IRound) => {
        console.info("Answers revealed:", round);
        store.dispatch(actions.answersRevealed(round));
      });

      gameSocket.on("round_winner_set", (winner: IGivenAnswer) => {
        console.info("Winner of the round:", winner);
        actions.winnerReceived(winner)(store.dispatch, store.getState, undefined);
        actions.assignWinningCard(winner)(store.dispatch, store.getState, undefined);
      });

      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
