import React, { useEffect, useState } from 'react';
import Genres from '../genres/genres';
import FilmsList from '../films-list/films-list';
import { ALL_GENRE, FILMS_INITIAL_COUNT, FILMS_STEP } from '../../constants';
import { State } from '../../types/state';
import { getFilteredFilms } from '../../selectors/selectors';
import { AsyncDispatch } from '../../types/action';
import { fetchFilms } from '../../store/thunks';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { setFilmsLoaded, setGenre } from '../../store/action';

const mapStateToProps = (state: State) => ({
  films: getFilteredFilms(state),
  isFilmsLoading: state.isFilmsLoading,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  downloadFilms() {
    dispatch(fetchFilms())
      .finally(() => dispatch(setFilmsLoaded()));
  },
  resetGenre() {
    dispatch(setGenre(ALL_GENRE));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type CatalogProps = ConnectedProps<typeof connector>;

function Catalog(props: CatalogProps): JSX.Element {
  const { films, isFilmsLoading, downloadFilms, resetGenre } = props;

  const [ shownFilmsCount, setShownFilmsCount ] = useState<number>(FILMS_INITIAL_COUNT);

  useEffect(() => {
    downloadFilms();
    resetGenre();
  }, [downloadFilms, resetGenre]);

  const shownFilms = films.slice(0, shownFilmsCount);

  const handleShowMoreClick = () => {
    setShownFilmsCount((count) => FILMS_STEP + count);
  };

  const resetShownFilmsCount = () => {
    setShownFilmsCount(FILMS_INITIAL_COUNT);
  };

  if (isFilmsLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <Genres resetShownFilmsCount={resetShownFilmsCount}/>
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
