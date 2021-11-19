import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { Film } from '../../types/film';
import VideoPreview from '../video-preview/video-preview';

const PREVIEW_DELAY = 1000;

type FilmCardProps = {
  film: Film,
}

function FilmCard({
  film: { previewImage, name, id, previewVideoLink },
}: FilmCardProps): JSX.Element {
  const [ isActive, setIsActive ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isActive) {
      timeoutId = setTimeout(() => {
        setIsPlaying(true);
      }, PREVIEW_DELAY);
    } else {
      setIsPlaying(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive]);

  const mouseOverHandler = () => {
    setIsActive(true);
  };

  const mouseLeaveHandler = () => {
    setIsActive(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="small-film-card__image">
        {
          isPlaying
            ? (
              <VideoPreview
                poster={previewImage}
                src={previewVideoLink}
              />
            )
            : (
              <img
                src={previewImage}
                alt={name}
                width="280"
                height="175"
              />
            )
        }
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={AppRoute.getFilmsLink(id)}
          className="small-film-card__link"
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
