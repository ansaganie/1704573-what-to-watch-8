import {
  setAppInitialized,
  setAuthStatus,
  setGenre,
  setUserData
} from '../store/action';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from '../store/reducer';
import { DataActions } from '../store/data/data-actions';

export enum ActionType {
  SetGenre = 'app/set-genre',
  SetAppInitialized = 'app/set-app-initialized',
  SetAuthStatus = 'user/set-auth-status',
  SetUserData = 'user/set-user-data',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setAuthStatus>
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setAppInitialized>
  | DataActions;

export type AsyncAction<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>
export type AsyncDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
