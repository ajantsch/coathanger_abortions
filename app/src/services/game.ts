import axios from "axios";

const { API_BASE_URL } = process.env;

export interface IGame {
  id: string;
  players: Map<string, string>;
}

export interface IPlayer {
  id: string;
  name: string;
}

const startGame = async () => {
  return axios.post<IGame>(`${API_BASE_URL}/games`).then(res => res.data);
};

const getGame = async (gameId: string): Promise<IGame> => {
  return axios.get(`${API_BASE_URL}/games/${gameId}`).then(res => {
    const game = {
      id: res.data.id,
      players: new Map<string, string>(
        res.data.players.map((player: { id: string; name: string }) => [
          player.id,
          player.name,
        ]),
      ),
    };
    return game;
  });
};

const addGamePlayer = async (gameId: string, name: string) => {
  return axios
    .put<IPlayer>(`${API_BASE_URL}/games/${gameId}/player`, { name })
    .then(res => res.data);
};

export default { startGame, getGame, addGamePlayer };
