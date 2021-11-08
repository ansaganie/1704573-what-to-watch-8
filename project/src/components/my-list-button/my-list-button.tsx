import React, { useEffect, useState } from 'react';
import { Favorite } from '../../constants';
import { toggleFavorite } from '../../services/dal';
import { Film } from '../../types/film';

type MyListButtonProps = {
  isFavorite: boolean,
  filmId: string,
  setFilm: (film: Film) => void;
};

function MyListButton(props: MyListButtonProps): JSX.Element {
  const { isFavorite, filmId, setFilm } = props;

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(true);
    toggleFavorite(filmId, isFavorite ? Favorite.UNSET : Favorite.SET)
      .then((data) => {
        setFilm(data);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }, [filmId, isFavorite, setFilm]);

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      disabled={isDisabled}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          isFavorite ? <use xlinkHref="#in-list"/> : <use xlinkHref="#add"/>
        }
      </svg>
      <span>My list</span>
    </button>
  );
}

export default MyListButton;
