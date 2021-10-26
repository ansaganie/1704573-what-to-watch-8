import React from 'react';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Actions } from '../../types/action';
import { setGenre } from '../../store/action';
import { getGenres } from '../../selectors/selectors';

const mapStateToProps = (state: State) => ({
  genres: getGenres(state),
  activeGenre: state.genre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onGenreClick(genre: string) {
    dispatch(setGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type GenreProps = ConnectedProps<typeof connector> & {
  activeGenre: string,
  resetShownFilmsCount: () => void,
}

function Genres(props: GenreProps): JSX.Element {
  const {
    activeGenre,
    onGenreClick,
    resetShownFilmsCount,
    genres,
  } = props;

  const handleGenreClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onGenreClick(evt.currentTarget.id);
    resetShownFilmsCount();
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((value) => (
        <li
          key={value}
          className={`catalog__genres-item ${value === activeGenre ? 'catalog__genres-item--active' : ''} `}
        >
          <a
            href={'/'}
            className="catalog__genres-link"
            id={value}
            onClick={handleGenreClick}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default connector(Genres);
