// import { API_CONFIG } from '@/config/api';
// import { store } from '@/store';
// import axios from 'axios';
// import qs from 'qs';

// export const getClient = axios.create({
//   baseURL: API_CONFIG.baseURL,
//   paramsSerializer: (params) =>
//     qs.stringify(params, {
//       arrayFormat: 'repeat',
//     }),
// });

// getClient.interceptors.request.use((config) => {
//   const { accessToken } = store.getState().authLogIn;

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });
