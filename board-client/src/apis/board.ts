import axios from "./axiosInstance";
import { BASE_URL } from "./constants";

const BOARD_BASE_URL = `${BASE_URL}/cards`;

const show = () => axios.get(`${BOARD_BASE_URL}/board/`);

const createTask = (payload: any) =>
  axios.post(`${BOARD_BASE_URL}/task/`, payload);

const updateTask = ({ id, payload }: any) =>
  axios.put(`${BOARD_BASE_URL}/task/${id}/`, payload);

const createCard = (payload: any) =>
  axios.post(`${BOARD_BASE_URL}/card/`, payload);

const updateCard = ({ id, payload }: any) =>
  axios.put(`${BOARD_BASE_URL}/task/${id}/`, payload);

export default { show, createTask, updateTask, createCard, updateCard };
