import { Credentials, LoginResponse } from "@/pages/Account/Login";
import axios from "axios";
import { BASE_URL } from "./constants";
import axiosInstance from "./axiosInstance";
import { UserPayload } from "@/pages/Dashboard/Settings";

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

export const updateUser = async (payload: UserPayload) => {
  const response = await axiosInstance.put(
    `${ACCOUNT_BASE_URL}/user/`,
    payload
  );
  return response.data;
};

export const showUser = async () => {
  const response = await axiosInstance.get(`${ACCOUNT_BASE_URL}/user/`);
  return response.data;
};

export const logout = () => {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
};
