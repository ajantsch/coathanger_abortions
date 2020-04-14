import io from "socket.io-client";

import actions from "../actions";
import store from "../store";
import { IRemotePlayer, IQuestionCard, IGivenAnswer } from "../interfaces";

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

      gameSocket.on("czar_set", (playerId: string) => {
        console.warn("Czar set:", playerId);
        store.dispatch(actions.czarSet(playerId));
      });

      gameSocket.on("question_card_drawn", (card: IQuestionCard) => {
        console.warn("Question card drawn:", card);
        /*
        this.setState({
          activeCards: { ...this.state.activeCards, question: card },
        });
        */
      });

      gameSocket.on("answer_card_given", (answer: IGivenAnswer) => {
        console.warn("Answer card given:", answer);
        store.dispatch(actions.answerReceived(answer));
      });

      gameSocket.on("round_finished", (winner: IGivenAnswer) => {
        console.warn("Winner of the round:", winner);
        store.dispatch(actions.winnerReceived(winner));
        /*
        const playerIndex = this.state.players.map(player => player.id).indexOf(winner.player);
        const players = [...this.state.players];
        const updatedPlayer = this.state.players[playerIndex];
        updatedPlayer.wonCards = [...updatedPlayer.wonCards, winner.card];
        players[playerIndex] = updatedPlayer;
        if (playerIndex >= 0) {
          this.setState({ players });
        }
        if (this.state.player) {
          if (winner.player === this.state.player.id) {
            console.warn("YOU HAVE WON!");
          }
        }
        */
      });

      resolve(gameSocket);
    });
  });
};

export default { connectToGame };
