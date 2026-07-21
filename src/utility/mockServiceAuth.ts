import { delay } from './delay';

interface User {
  id: number;
  name: string;
}
interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(800);
    if (email === 'test@test.com' && password === '12345') {
      return { token: 'fake-jwt-token', user: { id: 1, name: 'Test User' } };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    await delay(800);
    return { token: 'fake-jwt-token', user: { id: 2, name: 'New User' } };
  },
};
