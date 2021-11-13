import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../constants';
import { setFilmInFocus } from '../../../store/film/film-actions';
import { Film } from '../../../types/film';
import VideoPreview from '../video-preview/video-preview';

type FilmCardProps = {
  film: Film,
  onMouseOver: (evt: React.MouseEvent) => void,
  onMouseLeave: (evt: React.MouseEvent) => void,
  isActive: boolean,
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const { previewImage, name, id, previewVideoLink } = props.film;
  const { onMouseOver, onMouseLeave, isActive } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const filmTitleClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setFilmInFocus(props.film));
    history.push(AppRoute.FilmPage.replace(':id', id));
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
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
        <a
          href={'/'}
          className="small-film-card__link"
          onClick={filmTitleClickHandler}
        >
          {name}
        </a>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
