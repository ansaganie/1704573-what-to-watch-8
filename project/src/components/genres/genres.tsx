import React from 'react';

type GenreProps = {
  genres: string[],
  activeGenre: string,
  onGenreClick: (genre: string) => void,
};

function Genres(props: GenreProps): JSX.Element {
  const {
    activeGenre,
    genres,
    onGenreClick,
  } = props;

  const handleGenreClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onGenreClick(evt.currentTarget.id);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((value) => (
        <li
          key={value}
          className={`
            catalog__genres-item
            ${value === activeGenre && 'catalog__genres-item--active'}
          `}
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

export default Genres;
