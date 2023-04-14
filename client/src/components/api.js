import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getTickets = async () => {
  const response = await axios.get(`${API_URL}/tickets`);
  return response.data;
};

export const createTicket = async (ticketData, token) => {
  const response = await axios.post(`${API_URL}/tickets`, ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTicket = async (ticketId, token) => {
  const response = await axios.delete(`${API_URL}/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/users/signup`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};
