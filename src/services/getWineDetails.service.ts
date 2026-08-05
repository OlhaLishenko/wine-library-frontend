import { apiClient } from '@/api/apiClient';
import { WineType } from '@/shared/types/WineType';
import { AxiosError } from 'axios';

export const getWineDetailsService = async (id: string): Promise<WineType> => {
  try {
    const { data } = await apiClient.get<WineType>(`/wines/${id}`);

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error('You must be logged in to view the wine details');
      }
      throw new Error(err.message);
    }
    throw new Error('Oops, something went wrong');
  }
};
