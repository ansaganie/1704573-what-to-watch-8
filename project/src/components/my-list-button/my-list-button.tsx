import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Favorite } from '../../constants';
import { postToggleFavorite } from '../../store/data/data-thunks';
import { getMyListButtonDisabled } from '../../store/film/film-selectors';
import { AsyncDispatch, State } from '../../store/store';
import { FilmId } from '../../types/film';

const mapStateToProps = (state: State) => ({
  myListButtonDisabled: getMyListButtonDisabled(state),
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  toggleFavorite(filmId: FilmId, status: Favorite) {
    dispatch(postToggleFavorite(filmId, status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MyListButtonProps = ConnectedProps<typeof connector> & {
  isFavorite: boolean,
  filmId: FilmId,
};

function MyListButton(props: MyListButtonProps): JSX.Element {
  const {
    filmId,
    isFavorite,
    myListButtonDisabled,
    toggleFavorite,
  } = props;

  const favoriteClickHandler = () => {
    toggleFavorite(filmId, isFavorite ? Favorite.UNSET : Favorite.SET);
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      disabled={myListButtonDisabled}
      onClick={favoriteClickHandler}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          isFavorite
            ? <use xlinkHref="#in-list"/>
            : <use xlinkHref="#add"/>
        }
      </svg>
      <span>My list</span>
    </button>
  );
}

export default connector(MyListButton);
export { MyListButton };
