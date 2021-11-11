import { getFakeFilm, getFakeFilms } from '../../utils/mock';
import { unknownAction } from '../unknown';
import { dataReducer } from './data-reducer';
import {
  setFilms,
  setFilmsLoaded,
  setPromoFilm,
  setPromoFilmLoaded,
  updateFilm
} from './data-actions';

describe('Data reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( dataReducer( undefined, unknownAction())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
    });
  });

  it('should set films', () => {
    const films = getFakeFilms();

    expect( dataReducer( undefined, setFilms(films))).toEqual({
      films: films,
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
    });
  });
  it('should set films loaded', () => {
    expect( dataReducer( undefined, setFilmsLoaded())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: false,
      isPromoFilmLoading: true,
    });
  });

  it('should set promo film', () => {
    const film = getFakeFilm();

    expect( dataReducer( undefined, setPromoFilm(film.id))).toEqual({
      films: [],
      promoFilmId: film.id,
      isFilmsLoading: true,
      isPromoFilmLoading: true,
    });
  });

  it('should set promo film loaded', () => {
    expect( dataReducer( undefined, setPromoFilmLoaded())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: false,
    });
  });

  it('should update films list', () => {
    const film = getFakeFilm();

    expect( dataReducer( undefined, updateFilm(film))).toEqual({
      films: [film],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
    });
  });
});
