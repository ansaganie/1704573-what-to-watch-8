import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppActions } from '../store/app/app-actions';
import { DataActions } from '../store/data/data-actions';
import { State } from '../store/reducer';
import { UserActions } from '../store/user/user-actions';

export type Actions =
  | DataActions
  | UserActions
  | AppActions;

export type AsyncAction<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>
export type AsyncDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
