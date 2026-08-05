import { JwtPayload } from '@/shared/types/JwtPayload';
import { jwtDecode } from 'jwt-decode';

export const getUserInfo = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  return {
    email: decoded.sub,
    fullName: decoded.fullName,
  };
};
