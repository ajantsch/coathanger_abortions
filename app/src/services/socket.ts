import io from "socket.io-client";
import { ThunkDispatch } from "redux-thunk";

import actions, { IBaseAction } from "../actions";
import { AppState } from "../reducers";
import { IRound, IRemotePlayer, IGivenAnswer } from "../interfaces";

const { SOCKET_URL } = process.env;

const connectToGame = (
  gameId: string,
  playerId: string,
  dispatch: ThunkDispatch<AppState, undefined, IBaseAction>,
): Promise<SocketIOClient.Socket> => {
  return new Promise(resolve => {
    const gameSocket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}`, {
      query: { gameId, playerId },
    });

    gameSocket.on("connect", () => {
      gameSocket.emit("player_connected", `${playerId} now has a socket connection to game ${gameId}`);

      gameSocket.on("player_joined", (player: IRemotePlayer) => {
        console.info("Player joined:", player);
        dispatch(actions.remotePlayerJoined(player));
        dispatch(actions.showNotification(`Player joined: ${player.name}`));
      });

      gameSocket.on("player_set_active", (player: IRemotePlayer) => {
        console.info("Player set active:", player);
        dispatch(actions.remotePlayerActive(player));
      });

      gameSocket.on("player_set_inactive", (player: IRemotePlayer) => {
        console.info("Player set inactive:", player);
        dispatch(actions.remotePlayerInactive(player));
      });

      gameSocket.on("player_removed", (playerId: string) => {
        console.warn("Player removed:", playerId);
        dispatch(actions.remotePlayerRemoved(playerId));
      });

      gameSocket.on("new_round_started", (round: IRound) => {
        console.info("New round started:", round);
        dispatch(actions.roundReceived(round));
      });

      gameSocket.on("question_card_revealed", () => {
        console.info("Question card revealed.");
        dispatch(actions.questionRevealed());
      });

      gameSocket.on("answer_card_given", (answer: IGivenAnswer) => {
        console.info("Answer card given:", answer);
        dispatch(actions.answerReceived(answer));
      });

      gameSocket.on("answers_revealed", (round: IRound) => {
        console.info("Answers revealed:", round);
        dispatch(actions.answersRevealed(round));
      });

      gameSocket.on("round_winner_set", (winner: IGivenAnswer) => {
        console.info("Winner of the round:", winner);
        dispatch(actions.winnerReceived(winner));
        dispatch(actions.assignWinningCard(winner));
      });

      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
