import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'x-user-id': 'sandi-test', // AUTH WAJIB
    'Content-Type': 'application/json',
  },
});
