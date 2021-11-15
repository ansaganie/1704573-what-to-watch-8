type AbstractUser = {
  email: string,
  id: string,
  name: string,
  token: string,
}

export type User = AbstractUser & {
  avatarUrl: string,
};

export type ServerUser = AbstractUser & {
  'avatar_url': string,
}
