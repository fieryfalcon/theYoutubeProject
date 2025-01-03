import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Backend base URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE}/login`, credentials);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await axios.post(`${API_BASE}/signup`, credentials);
  return response.data;
};

export const sendPasswordReset = async (email) => {
  const response = await axios.post(`${API_BASE}/forgot-password`, email);
  return response.data;
};

export const googleSignIn = async () => {
  const response = await axios.get(`${API_BASE}/google-signin`);
  return response.data;
};


export const fetchYouTubeURL = async () => {
  const response = await axios.get(`${API_BASE}/youtube-url`);
  return response.data;
};