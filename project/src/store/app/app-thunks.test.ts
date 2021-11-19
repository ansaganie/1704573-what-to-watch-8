import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api, State } from '../../store/store';
import { Action } from 'redux';
import { AuthStatus, BackendRoute } from '../../constants';
import { getFakeServerUser } from '../../utils/mock';
import { adaptUserToClient } from '../../services/adapter';
import { initializeApp } from './app-thunks';
import { setAuthStatus, setUserData } from '../user/user-actions';
import { setAppInitialized } from './app-actions';

describe('User thunks', () => {
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

    await store.dispatch(initializeApp());

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.Auth),
      setUserData(adaptUserToClient(user)),
      setAppInitialized(),
    ]);
  });

  it('should set authStatus to "noAuth", when server return 401', async () => {
    const store = mockStore();
    mockApi.onGet(BackendRoute.Login).reply(401, {
      message: 'Forbidden',
    });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(initializeApp());

    expect(store.getActions()).toEqual([
      setAppInitialized(),
    ]);
  });
});
