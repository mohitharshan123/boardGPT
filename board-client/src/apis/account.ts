import { Credentials, LoginResponse } from "@/pages/Account/Login";
import axios from "axios";
import { BASE_URL } from "./constants";

const ACCOUNT_BASE_URL = `${BASE_URL}/account`;

const saveCredentials = (data: LoginResponse) => {
  if (!data.access || !data.refresh) return;
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
};

export const login = async (credentials: Credentials) => {
  const response = await axios.post(`${ACCOUNT_BASE_URL}/login/`, credentials);
  saveCredentials(response.data);

  return response.data;
};

export const register = async (credentials: Credentials) => {
  const response = await axios.post(
    `${ACCOUNT_BASE_URL}/register/`,
    credentials
  );
  saveCredentials(response.data);
  return response.data;
};
