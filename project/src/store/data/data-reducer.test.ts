import { getFakeFilm, getFakeFilms } from '../../utils/mock';
import { unknownAction } from '../../setupTests';
import { dataReducer } from './data-reducer';
import {
  addFilm,
  setFilms,
  setFilmsLoaded,
  setPromoFilmId,
  updateFilm
} from './data-actions';
import { Film } from '../../types/film';

const FILM_INDEX = 5;

const initialState = {
  films: [],
  promoFilmId: '',
  isFilmsLoading: true,
};

describe('Data reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( dataReducer( undefined, unknownAction())).toEqual({
      ...initialState,
    });
  });

  it('should set films', () => {
    const films = getFakeFilms();

    expect( dataReducer( undefined, setFilms(films))).toEqual({
      ...initialState,
      films: films,
    });
  });
  it('should set films loaded', () => {
    expect( dataReducer( undefined, setFilmsLoaded())).toEqual({
      ...initialState,
      isFilmsLoading: false,
    });
  });

  it('should set promo film id', () => {
    const film = getFakeFilm();

    expect( dataReducer( undefined, setPromoFilmId(film.id))).toEqual({
      ...initialState,
      promoFilmId: film.id,
    });
  });

  it('should update films list', () => {
    const films = getFakeFilms();
    const film: Film = {
      ...films[FILM_INDEX],
      isFavorite: !films[FILM_INDEX].isFavorite,
    };

    const state = {
      ...initialState,
      films,
    };

    expect( dataReducer( state, updateFilm(film))).toEqual({
      ...initialState,
      films: [
        ...films.slice(0, FILM_INDEX),
        film,
        ...state.films.slice(FILM_INDEX + 1),
      ],
    });
  });

  it('should add a film to films list', () => {
    const films = getFakeFilms();
    const film = getFakeFilm();

    const state = {
      ...initialState,
      films,
    };

    expect( dataReducer( state, addFilm(film))).toEqual({
      ...initialState,
      films: [
        ...films,
        film,
      ],
    });
  });
});
