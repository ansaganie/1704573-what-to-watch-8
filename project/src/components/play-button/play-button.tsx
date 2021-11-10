import React from 'react';
import { useHistory } from 'react-router';
import { AppRoute } from '../../constants';

type PlayButtonProps = {
  filmId: string;
}

function PlayButton(props: PlayButtonProps): JSX.Element {
  const { filmId } = props;
  const history = useHistory();

  const onPlayButtonClick = () => {
    history.push(AppRoute.Player.replace(':id', filmId));
  };

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={onPlayButtonClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButton;
