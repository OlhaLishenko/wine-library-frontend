// import { getClient } from '@/api/getClient';
import { apiClient } from '@/api/apiClient';
import { PageableResponse } from '@/shared/types/PageableResponse';
import { WineType } from '@/shared/types/WineType';
import { AxiosError } from 'axios';

export const searchWinesService = async (
  name: string,
  page = 0
): Promise<PageableResponse<WineType>> => {
  try {
    const { data } = await apiClient.get<PageableResponse<WineType>>(
      '/wines/search',
      { params: { name, page } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error('You must be logged in to view the wine list');
      }
      throw new Error(err.message);
    }
    throw new Error('Oops, something went wrong');
  }
};
