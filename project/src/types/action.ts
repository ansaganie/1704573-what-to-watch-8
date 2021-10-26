import { setAuthStatus, setDataLoaded, setFilms, setGenre, setPromoFilm } from '../store/action';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from './state';
import { AxiosInstance } from 'axios';

export enum ActionType {
  SetGenre = 'main/set-genre',
  SetFilms = 'data/set-films',
  SetPromoFilm = 'data/set-promoFilm',
  SetDataLoaded = 'data/set-reviews',
  SetAuthStatus = 'user/set-auth-status',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setPromoFilm>
  | ReturnType<typeof setDataLoaded>;

export type AsyncAction<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
