import jwtDecode from 'jwt-decode';
export const jwtPayload = async jwt => {
  return jose.jwtDecrypt(jwt, 'secret');
};
