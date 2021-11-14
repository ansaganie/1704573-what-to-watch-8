import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { api, State } from '../store';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { getFakeServerUser, getFakeServerFilms } from '../../utils/mock';
import { AuthStatus, BackendRoute } from '../../constants';
import { fetchMyList, login, logout } from './user-thunks';
import { SignInForm } from '../../types/sign-in-form';
import { setAuthStatus, setIsMyListLoading, setMyList, setUserData } from './user-actions';
import { adaptFilmToClient, adaptUserToClient } from '../../services/adapter';

const AUTH_TOKEN_KEY_NAME = 'wtw-token';

describe('Data thunks', () => {
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleware);

  it('should fetch user info and set token to storage', async () => {
    const user = getFakeServerUser();
    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    const form: SignInForm = {
      email: user.email,
      password: 'password',
    };

    mockApi
      .onPost(BackendRoute.Login)
      .reply(201, { ...user });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(login(form));

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.Auth),
      setUserData(adaptUserToClient(user)),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, user.token);
  });

  it('should dispatch logout action and drop token', async () => {
    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    mockApi
      .onDelete(BackendRoute.Logout)
      .reply(202);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      setAuthStatus(AuthStatus.NoAuth),
      setUserData(null),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should fetch favorite films and put into storage', async () => {
    const films = getFakeServerFilms();
    const expected = films.map(adaptFilmToClient);

    const store = mockStore();

    mockApi
      .onGet(BackendRoute.Favorite)
      .reply(201, films);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyList());

    expect(store.getActions()).toEqual([
      setIsMyListLoading(true),
      setMyList(expected),
      setIsMyListLoading(false),
    ]);
  });
});
