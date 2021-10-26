const AUTH_TOKEN_KEY_NAME = 'wtw-token';

const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ? token : '';
};

const setToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export { getToken, setToken, dropToken };
