import { unknownAction } from '../../setupTests';
import { setAppInitialized, setGenre, setServerNotWorking } from './app-actions';
import { appReducer } from './app-reducer';

const initialState = {
  genre: 'All genres',
  appInitialized: false,
  serverNotWorking: false,
};

describe('App reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( appReducer( undefined, unknownAction())).toEqual({
      ...initialState,
    });
  });

  it('should set genre', () => {
    const genre = 'Genre';
    expect( appReducer( undefined, setGenre(genre))).toEqual({
      ...initialState,
      genre: genre,
    });
  });

  it('should set app initialized to true', () => {
    expect( appReducer( undefined, setAppInitialized())).toEqual({
      ...initialState,
      appInitialized: true,
    });
  });

  it('should set server not working to true', () => {
    expect( appReducer( undefined, setServerNotWorking())).toEqual({
      ...initialState,
      serverNotWorking: true,
    });
  });
});
