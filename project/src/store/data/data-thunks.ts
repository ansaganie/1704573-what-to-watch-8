import { toast } from 'react-toastify';
import { BackendRoute, Favorite } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { FilmId, ServerFilm } from '../../types/film';
import { setIsFilmLoading, setMyListButtonDisabled } from '../film/film-actions';
import { AsyncAction } from '../store';
import {
  setFilms,
  setFilmsLoaded,
  setPromoFilmId,
  updateFilm
} from './data-actions';

const FETCH_FILMS_ERROR = 'Could not load the films';
const FETCH_PROMO_FILM_ERROR = 'Could not load the promo film';
const TOGGLE_FAVORITE_ERROR = 'An error occurred while adding/removing to my list';

const fetchFilms = (): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ServerFilm[]>(BackendRoute.Films);
      dispatch(setFilms(data.map(adaptFilmToClient)));
    } catch (error) {
      toast.info(FETCH_FILMS_ERROR);
    } finally {
      dispatch(setFilmsLoaded());
    }
  };

const fetchPromoFilm = (): AsyncAction =>
  async (dispatch, getState, api): Promise<void> => {
    const previousId = getState().data.promoFilmId;

    if (!previousId) {
      dispatch(setIsFilmLoading(true));
    }

    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.PromoFilm);
      const currentId = data.id.toString();
      if (previousId !== currentId) {
        dispatch(setPromoFilmId(currentId));
      }
    } catch (error) {
      toast.info(FETCH_PROMO_FILM_ERROR);
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

const postToggleFavorite = (filmId: FilmId, status: Favorite): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setMyListButtonDisabled(true));
      const { data } = await api.post<ServerFilm>(BackendRoute.getFavoriteLink(filmId, status));
      dispatch(updateFilm(adaptFilmToClient(data)));
    } catch (error) {
      toast.info(TOGGLE_FAVORITE_ERROR);
    } finally {
      dispatch(setMyListButtonDisabled(false));
    }
  };

export {
  fetchFilms,
  fetchPromoFilm,
  postToggleFavorite
};
