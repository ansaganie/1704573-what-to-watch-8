import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { State } from '../../store/reducer';
import { useLoadFilm } from '../../hooks/films';
import Spinner from '../../components/spinner/Spinner';

const mapStateToProps = (state: State) => ({
  films: state.data.films,
});

const connector = connect(mapStateToProps);

type PlayerPageProps = ConnectedProps<typeof connector>;

function Player(props: PlayerPageProps): JSX.Element {
  const { films } = props;
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isLoading, film } = useLoadFilm(id, films);

  const onExitClick = () => {
    history.goBack();
  };

  return (
    <div className="player">
      {
        !film && isLoading ? <Spinner/> :
          <video src={film?.videoLink} className="player__video" poster={film?.backgroundImage}/>
      }

      <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

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
