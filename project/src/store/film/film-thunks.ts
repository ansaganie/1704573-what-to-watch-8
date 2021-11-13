import { BackendRoute } from '../../constants';
import { adaptFilmToClient } from '../../services/adapter';
import { ServerFilm } from '../../types/film';
import { updateFilm } from '../data/data-actions';
import { AsyncAction } from '../store';
import { setFilmInFocus, setIsFilmLoading } from './film-actions';

const fetchFilm = (filmId: string): AsyncAction =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setIsFilmLoading(true));

    try {
      const { data } = await api.get<ServerFilm>(BackendRoute.Film(filmId));

      const film = adaptFilmToClient(data);

      dispatch(setFilmInFocus(film));
      dispatch(updateFilm(film));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      dispatch(setIsFilmLoading(false));
    }
  };

export { fetchFilm };
