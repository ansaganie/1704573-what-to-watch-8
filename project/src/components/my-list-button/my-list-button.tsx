import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Favorite } from '../../constants';
import { postToggleFavorite } from '../../store/data/data-thunks';
import { AsyncDispatch, State } from '../../store/store';

const mapStateToProps = (state: State) => ({
  myListButtonDisabled: state.film.myListButtonDisabled,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  toggleFavorite(filmId: string, status: Favorite) {
    dispatch(postToggleFavorite(filmId, status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MyListButtonProps = ConnectedProps<typeof connector> & {
  isFavorite: boolean,
  filmId: string,
};

function MyListButton(props: MyListButtonProps): JSX.Element {
  const {
    isFavorite,
    myListButtonDisabled,
    filmId,
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
          isFavorite ? <use xlinkHref="#in-list"/> : <use xlinkHref="#add"/>
        }
      </svg>
      <span>My list</span>
    </button>
  );
}

export default connector(MyListButton);
export { MyListButton };
