import { unknownAction } from '../unknown-action';
import { setAppInitialized, setGenre } from './app-actions';
import { appReducer } from './app-reducer';

describe('App reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( appReducer( undefined, unknownAction())).toEqual({
      genre: 'All genres',
      appInitialized: false,
    });
  });

  it('should set genre', () => {
    const genre = 'Genre';
    expect( appReducer( undefined, setGenre(genre))).toEqual({
      genre: genre,
      appInitialized: false,
    });
  });

  it('should set app initialized to true', () => {
    expect( appReducer( undefined, setAppInitialized())).toEqual({
      genre: 'All genres',
      appInitialized: true,
    });
  });
});
