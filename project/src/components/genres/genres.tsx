import React from 'react';
import { Genre, Genres as GenreTypes } from '../../types/genres';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Actions } from '../../types/action';
import { setGenre } from '../../store/action';

const GENRES: Genre[] = [
  {
    id: 'genre-0',
    title: 'All genres',
    value: GenreTypes.AllGenres,
  },
  {
    id: 'genre-1',
    title: 'Crime',
    value: GenreTypes.Crime,
  },
  {
    id: 'genre-2',
    title: 'Comedies',
    value: GenreTypes.Comedies,
  },
  {
    id: 'genre-3',
    title: 'Documentary',
    value: GenreTypes.Documentary,
  },
  {
    id: 'genre-4',
    title: 'Dramas',
    value: GenreTypes.Dramas,
  },
  {
    id: 'genre-5',
    title: 'Horror',
    value: GenreTypes.Horror,
  },
  {
    id: 'genre-6',
    title: 'Kids & Family',
    value: GenreTypes.KidsAndFamily,
  },
  {
    id: 'genre-7',
    title: 'Romance',
    value: GenreTypes.Romance,
  },
  {
    id: 'genre-8',
    title: 'Sci-Fi',
    value: GenreTypes.SciFi,
  },
  {
    id: 'genre-9',
    title: 'Thrillers',
    value: GenreTypes.Thrillers,
  },
];

const mapStateToProps = (state: State) => ({
  activeGenre: state.genre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onGenreClick(genre: GenreTypes) {
    dispatch(setGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type GenreProps = ConnectedProps<typeof connector> & {
  activeGenre: GenreTypes,
}

function Genres(props: GenreProps): JSX.Element {
  const { activeGenre, onGenreClick } = props;

  const handleGenreClick = (genre: GenreTypes) => (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onGenreClick(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {GENRES.map(({ id, title, value }) => (
        <li
          key={id}
          className={`catalog__genres-item ${value === activeGenre ? 'catalog__genres-item--active' : ''} `}
        >
          <a
            href={'/'}
            className="catalog__genres-link"
            id={`genre-${value}`}
            onClick={handleGenreClick(value)}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default connector(Genres);
