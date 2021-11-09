import React, { useState } from 'react';
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
  const [favorite, setFavorite] = useState(isFavorite);

  const favoriteClickHandler = () => {
    setIsDisabled(true);
    toggleFavorite(filmId, favorite ? Favorite.UNSET : Favorite.SET)
      .then((data) => {
        setFilm(data);
        setFavorite((prev) => !prev);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      disabled={isDisabled}
      onClick={favoriteClickHandler}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          favorite ? <use xlinkHref="#in-list"/> : <use xlinkHref="#add"/>
        }
      </svg>
      <span>My list</span>
    </button>
  );
}

export default MyListButton;
