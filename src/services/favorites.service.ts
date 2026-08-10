import { apiClient } from '@/api/apiClient';
import { FavoriteItem } from '@/shared/types/FavoriteItem';
import { PageableResponse } from '@/shared/types/PageableResponse';
import { AxiosError } from 'axios';

const errorHandling = (
  err: unknown,
  message: string = 'You must be logged in to view the wine list'
): never => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error(message);
    }
    throw new Error(err.message);
  }
  throw new Error('Oops, something went wrong');
};

export const favoritesService = {
  saveItem: async (id: number): Promise<FavoriteItem> => {
    try {
      const { data } = await apiClient.post<FavoriteItem>(`/favorites/${id}`);

      return data;
    } catch (err) {
      return errorHandling(
        err,
        'You must be logged in to save wine to your favorites list'
      );
    }
  },

  getList: async () => {
    try {
      const { data } =
        await apiClient.get<PageableResponse<FavoriteItem>>('/favorites');

      return data.content;
    } catch (err) {
      return errorHandling(err);
    }
  },

  getCount: async () => {
    try {
      const { data } =
        await apiClient.get<PageableResponse<FavoriteItem>>('/favorites/count');

      return data.content;
    } catch (err) {
      return errorHandling(err);
    }
  },

  getRecent: async () => {
    try {
      const { data } =
        await apiClient.get<PageableResponse<FavoriteItem>>(
          '/favorites/recent'
        );

      return data.content;
    } catch (err) {
      return errorHandling(err);
    }
  },

  deleteItem: async (id: number): Promise<FavoriteItem> => {
    try {
      const { data } = await apiClient.delete(`/favorites/${id}`);

      return data;
    } catch (err) {
      return errorHandling(err, 'You must be logged in to delete wine');
    }
  },

  isFavorite: async (id: number): Promise<boolean> => {
    try {
      const { data } = await apiClient.get(`/favorites/${id}`);

      return data;
    } catch (err) {
      return errorHandling(err, 'You must be logged in to see the status');
    }
  },
};
