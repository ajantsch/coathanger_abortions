import axios from "axios";

const { API_BASE_URL } = process.env;

export interface IGame {
  id: string;
  players: { id: string; name: string }[];
  czar: string;
  activeCards: {
    question: ICard | undefined;
    answers: { player: string; card: ICard }[];
  };
}

export interface IPlayer {
  id: string;
  name: string;
  activeCards: ICard[];
  wonCards: ICard[];
}

export interface ICard {
  id: string;
  content: string;
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

const getGamePlayer = async (gameId: string, playerId: string) => {
  return axios.get<IPlayer>(`${API_BASE_URL}/games/${gameId}/player/${playerId}`).then(res => res.data);
};

const drawQuestionCard = async (gameId: string) => {
  return axios.get<ICard>(`${API_BASE_URL}/games/${gameId}/draw/question`).then(res => res.data);
};

const selectAnswerCard = async (gameId: string, playerId: string, card: ICard) => {
  return axios
    .put<ICard>(`${API_BASE_URL}/games/${gameId}/answer`, {
      player: playerId,
      card,
    })
    .then(res => res.data);
};

export default {
  createGame,
  getGame,
  addGamePlayer,
  getGamePlayer,
  drawQuestionCard,
  selectAnswerCard,
};
