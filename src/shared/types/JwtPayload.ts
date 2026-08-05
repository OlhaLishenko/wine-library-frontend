export interface JwtPayload {
  sub: string;
  fullName: string;
  exp: number;
  iat: number;
}
