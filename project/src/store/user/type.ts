import { AuthStatus } from '../../constants';
import { User } from '../../types/user';

export type UserState = {
  authStatus: AuthStatus,
  user: User | null,
};
