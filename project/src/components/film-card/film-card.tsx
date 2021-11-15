import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { Film } from '../../types/film';
import VideoPreview from '../video-preview/video-preview';

type FilmCardProps = {
  film: Film,
}

function FilmCard({
  film: { previewImage, name, id, previewVideoLink },
}: FilmCardProps): JSX.Element {
  const [ isActive, setIsActive ] = useState(false);

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
      id={id}
    >
      <div className="small-film-card__image">
        <VideoPreview
          poster={previewImage}
          src={previewVideoLink}
          isPlaying={isActive}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={AppRoute.FilmPage.replace(':id', id)}
          className="small-film-card__link"
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
