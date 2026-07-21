import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const authClient = axios.create({
  baseURL: API_CONFIG.AUTH,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const wakeUpAuthServer = () => {
  authClient.get('/', { timeout: 5000 }).catch(() => {});
};
