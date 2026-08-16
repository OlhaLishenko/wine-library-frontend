import { apiClient } from '@/api/apiClient';
import { authClient } from '@/api/authClient';
import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { RegisterData } from '@/features/auth/types/RegisterData';
import { User } from '@/features/auth/types/User';
import { AxiosError } from 'axios';

type ApiErrorResponse = {
  timestamp: string;
  statusCode: number;
  errors: string[] | Record<string, string[]>;
};

function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    if (err.code === 'ECONNABORTED') {
      return 'Server is starting up, please try again in a few seconds.';
    }

    const data = err.response?.data as ApiErrorResponse | undefined;

    if (Array.isArray(data?.errors) && data?.errors.length > 0) {
      return data.errors.join(', ');
    }

    if (data?.errors && typeof data?.errors === 'object') {
      const messages = Object.values(data.errors).flat();
      if (messages.length > 0) {
        return messages.join(', ');
      }
    }

    return 'Untracked error';
  }
  return 'Untracked error';
}

function extractLoginErrorMessage(err: unknown): string {
  const status = err instanceof AxiosError ? err.response?.status : undefined;
  if (status === 401 || status === 403) {
    return 'Password or email is incorrect';
  }
  return extractErrorMessage(err);
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    let data: AuthResponse | undefined;
    try {
      ({ data } = await authClient.post('/login', { email, password }));
    } catch (err) {
      throw new Error(extractLoginErrorMessage(err));
    }

    if (!data) {
      throw new Error('Login failed');
    }

    return data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  },

  register: async (registerData: RegisterData): Promise<User> => {
    let data: User | undefined;
    try {
      ({ data } = await authClient.post('/register', registerData));
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }

    if (!data) {
      throw new Error('Registration failed');
    }

    return data;
  },
};
