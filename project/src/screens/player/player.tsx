import React, { useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { State } from '../../store/reducer';
import { useLoadFilm } from '../../hooks/films';
import Spinner from '../../components/spinner/Spinner';
import { convertSecondsToHours } from '../../utils/date';
import { AppRoute } from '../../constants';

const mapStateToProps = (state: State) => ({
  films: state.data.films,
});

const connector = connect(mapStateToProps);

type PlayerPageProps = ConnectedProps<typeof connector>;

function Player(props: PlayerPageProps): JSX.Element {
  const { films } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isLoading, film } = useLoadFilm(id, films);

  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isVideoLoading, setIsVideoLoading ] = useState(true);
  const [ progress, setProgress ] = useState(0);
  const [ time, setTime ] = useState('00:00');

  const waitingHandler = () => {
    setIsVideoLoading(true);
  };

  const loadedDataHandler = () => {
    setIsVideoLoading(false);
  };

  const playingHandler = () => {
    setIsVideoLoading(false);
  };

  const timeUpdateHandler = (evt: React.SyntheticEvent<HTMLVideoElement>) => {
    const { currentTarget } = evt;
    const percentage = currentTarget.currentTime * 100 / currentTarget.duration;
    const timeElapsed = convertSecondsToHours(currentTarget.duration - currentTarget.currentTime);

    setTime(timeElapsed);
    setProgress(percentage);
  };

  const playButtonClickHandler = () => {
    if (videoRef && videoRef.current) {
      const player = videoRef.current;

      if (videoRef.current.paused) {
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    }
  };

  const fullScreenClickHandler = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const exitClickHandler = () => {
    history.push(AppRoute.FilmPage.replace(':id', id));
  };

  const playHandler = () => {
    setIsPlaying(true);
  };

  const pauseHandler = () => {
    setIsPlaying(false);
  };

  return (
    <div className="player">
      { (isLoading || isVideoLoading) && <Spinner isFullScreen/>}

      {
        film &&
        <video
          ref={videoRef}
          src={film?.videoLink}
          className="player__video"
          poster={film?.backgroundImage}
          autoPlay
          onPlay={playHandler}
          onPause={pauseHandler}
          onTimeUpdate={timeUpdateHandler}
          onWaiting={waitingHandler}
          onPlaying={playingHandler}
          onLoadedData={loadedDataHandler}
        />
      }


      <button type="button" className="player__exit" onClick={exitClickHandler}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"/>
            <div className="player__toggler" style={{ left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{time}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={playButtonClickHandler}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              { isPlaying ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"/>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film?.name}</div>
          <button type="button" className="player__full-screen" onClick={fullScreenClickHandler}>
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
