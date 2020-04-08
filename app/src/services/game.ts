import axios from "axios";

const { API_BASE_URL } = process.env;

export interface IGame {
  id: string;
  players: { id: string; name: string }[];
}

export interface IPlayer {
  id: string;
  name: string;
}

const createGame = async () => {
  return axios.post<IGame>(`${API_BASE_URL}/games`).then(res => res.data);
};

const getGame = async (gameId: string): Promise<IGame> => {
  return axios.get(`${API_BASE_URL}/games/${gameId}`).then(res => res.data);
};

const addGamePlayer = async (gameId: string, name: string) => {
  return axios
    .put<IPlayer>(`${API_BASE_URL}/games/${gameId}/player`, { name })
    .then(res => res.data);
};

export default { createGame, getGame, addGamePlayer };
