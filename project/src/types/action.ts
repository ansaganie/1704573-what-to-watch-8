import {
  setAuthStatus,
  setFilms,
  setFilmsLoaded,
  setGenre,
  setPromoFilm,
  setPromoFilmLoaded,
  setUserData
} from '../store/action';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from './state';
import { AxiosInstance } from 'axios';

export enum ActionType {
  SetGenre = 'main/set-genre',
  SetFilms = 'data/set-films',
  SetPromoFilm = 'data/set-promoFilm',
  SetFilmsLoaded = 'data/set-films-loaded',
  SetPromoFilmLoaded = 'data/set-promoFilm-loaded',
  SetAuthStatus = 'user/set-auth-status',
  SetUserData = 'data/set-user-data',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromoFilm>
  | ReturnType<typeof setFilmsLoaded>
  | ReturnType<typeof setPromoFilmLoaded>
  | ReturnType<typeof setUserData>;

export type AsyncAction<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>
export type AsyncDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
