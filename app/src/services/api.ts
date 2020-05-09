import axios from "axios";

import { IGame, IPlayer, IRound, ICard, IGivenAnswer } from "../interfaces";

const { API_BASE_URL } = process.env;

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

const patchGamePlayerActive = async (gameId: string, playerId: string) => {
  return axios.patch<IPlayer>(`${API_BASE_URL}/games/${gameId}/player/${playerId}/active`).then(res => res.data);
};

const patchGamePlayerInactive = async (gameId: string, playerId: string) => {
  return axios.patch<IPlayer>(`${API_BASE_URL}/games/${gameId}/player/${playerId}/inactive`).then(res => res.data);
};

const removeGamePlayer = async (gameId: string, playerId: string) => {
  return axios.delete<IPlayer>(`${API_BASE_URL}/games/${gameId}/player/${playerId}`).then(res => res.data);
};

const selectRoundWinner = async (gameId: string, playerId: string, answer: IGivenAnswer) => {
  return axios
    .post(`${API_BASE_URL}/games/${gameId}/round/winner`, { player: playerId, card: answer.card })
    .then(res => res.data);
};

const startNewRound = async (gameId: string): Promise<IRound> => {
  return axios.put<IRound>(`${API_BASE_URL}/games/${gameId}/round`).then(res => res.data);
};

const getRound = async (gameId: string): Promise<IRound> => {
  return axios.get(`${API_BASE_URL}/games/${gameId}/round`).then(res => res.data);
};

const revealQuestion = async (gameId: string) => {
  return axios.patch<IRound>(`${API_BASE_URL}/games/${gameId}/round/question`).then(res => res.data);
};

const selectAnswer = async (gameId: string, playerId: string, card: ICard) => {
  return axios
    .put<IGivenAnswer>(`${API_BASE_URL}/games/${gameId}/answer`, {
      player: playerId,
      card,
    })
    .then(res => res.data);
};

const drawAnswer = async (gameId: string, playerId: string) => {
  return axios.get<ICard>(`${API_BASE_URL}/games/${gameId}/player/${playerId}/card`).then(res => res.data);
};

const revealAnswers = async (gameId: string): Promise<IRound> => {
  return axios.patch<IRound>(`${API_BASE_URL}/games/${gameId}/round/answers`).then(res => res.data);
};

export default {
  createGame,
  getGame,
  getRound,
  addGamePlayer,
  getGamePlayer,
  patchGamePlayerActive,
  patchGamePlayerInactive,
  removeGamePlayer,
  revealQuestion,
  selectAnswer,
  drawAnswer,
  revealAnswers,
  selectRoundWinner,
  startNewRound,
};
