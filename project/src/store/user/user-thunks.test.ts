import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { State } from '../reducer';
import { Action } from 'redux';
import { AuthStatus, BackendRoute } from '../../constants';
import { checkAuthStatus } from './user-thunks';
import { setAuthStatus, setUserData } from './user-actions';
import { getFakeServerUser } from '../../utils/mock';
import { adaptUserToClient } from '../../services/adapter';

describe('User thunks', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleware);

  it('should set authStatus to "auth", when server return 200', async () => {
    const user = getFakeServerUser();
    const store = mockStore();
    mockApi.onGet(BackendRoute.Login).reply(200, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthStatus());

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.Auth),
      setUserData(adaptUserToClient(user)),
    ]);
  });
});

