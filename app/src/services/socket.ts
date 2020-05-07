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
    const socket: SocketIOClient.Socket = io.connect(`${SOCKET_URL}`, {
      query: { gameId, playerId },
    });

    socket.on("connect", () => {
      socket.emit("player_connected", `${playerId} now has a socket connection to game ${gameId}`);

      socket.on("player_joined", (player: IRemotePlayer) => {
        console.info("Player joined:", player);
        dispatch(actions.remotePlayerJoined(player));
        dispatch(actions.showNotification(`Player joined: ${player.name}`));
      });

      socket.on("player_set_active", (player: IRemotePlayer) => {
        console.info("Player set active:", player);
        dispatch(actions.remotePlayerActive(player));
      });

      socket.on("player_set_inactive", (player: IRemotePlayer) => {
        console.info("Player set inactive:", player);
        dispatch(actions.remotePlayerInactive(player));
      });

      socket.on("player_removed", (playerId: string) => {
        console.warn("Player removed:", playerId);
        dispatch(actions.remotePlayerRemoved(playerId));
      });

      socket.on("new_round_started", () => {
        console.info("New round started");
        dispatch(actions.getCurrentRound(gameId));
      });

      socket.on("question_card_revealed", () => {
        console.info("Question card revealed.");
        dispatch(actions.questionRevealed());
      });

      socket.on("answer_card_received", (answer: IGivenAnswer) => {
        console.info("Answer card received:", answer);
        dispatch(actions.answerReceived(answer));
      });

      socket.on("answers_revealed", (round: IRound) => {
        console.info("Answers revealed:", round);
        dispatch(actions.answersRevealed(round));
      });

      socket.on("round_winner_set", (winner: IGivenAnswer) => {
        console.info("Winner of the round:", winner);
        dispatch(actions.winnerReceived(winner));
        dispatch(actions.assignWinningCard(winner));
      });

      resolve(socket);
    });
  });
};

const disconnectFromGame = (socket: SocketIOClient.Socket) => {
  socket.disconnect();
};

export default { connectToGame, disconnectFromGame };
