import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?
  `${process.env.NEXT_PUBLIC_API_URL}/api` :
  'https://travelblog.skillbox.cc/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});