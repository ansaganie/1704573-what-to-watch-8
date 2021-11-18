import { State } from '../store';

const getGenre = (state: State): string => state.app.genre;
const getAppInitialized = (state: State): boolean => state.app.appInitialized;
const getServerNotWorking = (state: State): boolean => state.app.serverNotWorking;

export {
  getGenre,
  getAppInitialized,
  getServerNotWorking
};
