import { getFakeFilm, getFakeFilms } from '../../utils/mock';
import { unknownAction } from '../unknown';
import { setFilms, setFilmsLoaded, setMyListButtonDisabled, setPromoFilm, setPromoFilmLoaded, updateFilm } from './data-actions';
import { dataReducer } from './data-reducer';


describe('Data reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( dataReducer( undefined, unknownAction())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
      myListButtonDisabled: false,
    });
  });

  it('should set films', () => {
    const films = getFakeFilms();

    expect( dataReducer( undefined, setFilms(films))).toEqual({
      films: films,
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
      myListButtonDisabled: false,
    });
  });
  it('should set films loaded', () => {
    expect( dataReducer( undefined, setFilmsLoaded())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: false,
      isPromoFilmLoading: true,
      myListButtonDisabled: false,
    });
  });

  it('should set promo film', () => {
    const film = getFakeFilm();

    expect( dataReducer( undefined, setPromoFilm(film.id))).toEqual({
      films: [],
      promoFilmId: film.id,
      isFilmsLoading: true,
      isPromoFilmLoading: true,
      myListButtonDisabled: false,
    });
  });

  it('should set promo film loaded', () => {
    expect( dataReducer( undefined, setPromoFilmLoaded())).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: false,
      myListButtonDisabled: false,
    });
  });

  it('should update films list', () => {
    const film = getFakeFilm();

    expect( dataReducer( undefined, updateFilm(film))).toEqual({
      films: [film],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
      myListButtonDisabled: false,
    });
  });

  it('should set mylist button disabled', () => {
    expect( dataReducer( undefined, setMyListButtonDisabled(true))).toEqual({
      films: [],
      promoFilmId: '',
      isFilmsLoading: true,
      isPromoFilmLoading: true,
      myListButtonDisabled: true,
    });
  });
});
