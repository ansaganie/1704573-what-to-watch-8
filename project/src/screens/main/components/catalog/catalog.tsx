import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ALL_GENRE, FILMS_INITIAL_COUNT, FILMS_STEP } from '../../../../constants';
import { fetchFilms } from '../../../../store/data/data-thunks';
import { getFilteredFilms, getGenres } from '../../../../store/data/data-selectors';
import { setGenre } from '../../../../store/app/app-actions';
import Genres from '../genres/genres';
import FilmsList from '../../../../components/films-list/films-list';
import Spinner from '../../../../components/spinner/Spinner';
import { AsyncDispatch, State } from '../../../../store/store';

const mapStateToProps = (state: State) => ({
  films: getFilteredFilms(state),
  isFilmsLoading: state.data.isFilmsLoading,
  genres: getGenres(state),
  activeGenre: state.app.genre,
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
    if (films.length === 0) {
      downloadFilms();
    }
  }, [ downloadFilms, films ]);

  useEffect(() => {
    updateGenre(ALL_GENRE);
  }, [ updateGenre ]);

  const shownFilms = films.slice(0, shownFilmsCount);

  const handleShowMoreClick = () => {
    setShownFilmsCount((count) => FILMS_STEP + count);
  };

  const onGenreClick = useCallback((genre) => {
    updateGenre(genre);
    setShownFilmsCount(FILMS_INITIAL_COUNT);
  }, [updateGenre]);

  if (isFilmsLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <Genres activeGenre={activeGenre} genres={genres} onGenreClick={onGenreClick}/>
      <FilmsList films={shownFilms}/>
      {
        shownFilmsCount <= shownFilms.length &&
        <div className="catalog__more">
          <button onClick={handleShowMoreClick} className="catalog__button" type="button">Show more</button>
        </div>
      }
    </section>
  );
}

export default connector(Catalog);
export { Catalog };
