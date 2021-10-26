import React, { useEffect } from 'react';
import Sprite from '../sprite/sprite';
import { Redirect, useParams } from 'react-router-dom';
import { scrollToFilmTitle } from '../../utils/side-effects';
import { AppRoute } from '../../constants';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: State) => ({
  films: state.films,
});

const connector = connect(mapStateToProps);

type PlayerPageProps = ConnectedProps<typeof connector>;

function Player(props: PlayerPageProps): JSX.Element {
  const { films } = props;

  const { id } = useParams<{ id: string }>();
  useEffect(scrollToFilmTitle);
  const film = films.find((elem) => id === elem.id);

  if (!film) {
    return <Redirect to={AppRoute.Main}/>;
  }

  const { posterImage, videoLink } = film;

  return (
    <div className="player">
      <Sprite/>

      <video src={videoLink} className="player__video" poster={posterImage}/>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"/>
            <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Player };
export default connector(Player);
