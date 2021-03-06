import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ALL_GENRE } from '../../constants';
import { AsyncDispatch, State } from '../../store/store';
import { fetchFilms } from '../../store/data/data-thunks';
import { setGenre } from '../../store/app/app-actions';
import { getGenre } from '../../store/app/app-selector';
import {
  getFilteredFilms,
  getGenres,
  getIsFilmsLoading
} from '../../store/data/data-selectors';
import Genres from '../genres/genres';
import FilmsList from '../films-list/films-list';
import Spinner from '../spinner/Spinner';

const FILMS_INITIAL_COUNT = 8;
const FILMS_STEP = 8;

const mapStateToProps = (state: State) => ({
  films: getFilteredFilms(state),
  isFilmsLoading: getIsFilmsLoading(state),
  genres: getGenres(state),
  activeGenre: getGenre(state),
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  downloadFilms() {
    dispatch(fetchFilms());
  },
  updateGenre(genre: string) {
    dispatch(setGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type CatalogProps = ConnectedProps<typeof connector>;

function Catalog(props: CatalogProps): JSX.Element {
  const {
    films,
    isFilmsLoading,
    activeGenre,
    genres,
    downloadFilms,
    updateGenre,
  } = props;

  const [ shownFilmsCount, setShownFilmsCount ] = useState<number>(FILMS_INITIAL_COUNT);

  useEffect(() => {
    downloadFilms();
  }, [ downloadFilms ]);

  useEffect(() => {
    updateGenre(ALL_GENRE);
  }, [ updateGenre ]);

  const shownFilms = films.slice(0, shownFilmsCount);

  const showMoreClickHandler = () => {
    setShownFilmsCount((count) => FILMS_STEP + count);
  };

  const onGenreClick = useCallback((genre) => {
    updateGenre(genre);
    setShownFilmsCount(FILMS_INITIAL_COUNT);
  }, [ updateGenre ]);

  if (isFilmsLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <Genres
        activeGenre={activeGenre}
        genres={genres}
        onGenreClick={onGenreClick}
      />
      <FilmsList films={shownFilms}/>
      {
        shownFilmsCount <= shownFilms.length && (
          <div className="catalog__more">
            <button
              onClick={showMoreClickHandler}
              className="catalog__button"
              type="button"
            >
              Show more
            </button>
          </div>
        )
      }
    </section>
  );
}

export default connector(Catalog);
export { Catalog };
