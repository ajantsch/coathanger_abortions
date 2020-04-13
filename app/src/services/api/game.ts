import axios from "axios";

const { API_BASE_URL } = process.env;

export interface IGame {
  id: string;
  players: Omit<IPlayer, "activeCards">[];
  czar: string;
  activeCards: {
    question: ICard | undefined;
    answers: IGivenAnswer[];
  };
}

export interface IGivenAnswer {
  player: string;
  card: ICard;
}

export interface IPlayer {
  id: string;
  name: string;
  activeCards: ICard[];
  wonCards: ICard[];
}

export interface ICard {
  id: string;
  type: "answer" | "question";
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

const selectRoundWinner = async (gameId: string, playerId: string, answer: IGivenAnswer) => {
  return axios
    .post(`${API_BASE_URL}/games/${gameId}/round/winner`, { player: playerId, card: answer.card })
    .then(res => res.data);
};

const startNewRound = async (gameId: string) => {
  return axios.put(`${API_BASE_URL}/games/${gameId}/round/start`).then(res => res.data);
};

export default {
  createGame,
  getGame,
  addGamePlayer,
  getGamePlayer,
  drawQuestionCard,
  selectAnswerCard,
  selectRoundWinner,
  startNewRound,
};
