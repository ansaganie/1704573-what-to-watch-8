import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { scrollToFilmTitle } from '../../utils/side-effects';
import ReviewForm from '../../components/review-form/review-form';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import NotFound from '../not-found/not-found';
import { fetchFilm } from '../../services/dal';
import { Film } from '../../types/film';
import Spinner from '../../components/spinner/Spinner';

const mapStateToProps = (state: State) => ({
  films: state.films,
});

const connector = connect(mapStateToProps);

type AddReviewProps = ConnectedProps<typeof connector>;

function AddReview(props: AddReviewProps): JSX.Element {
  const { films } = props;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ film, setFilm ] = useState<Film | null>(null);

  const { id } = useParams<{ id: string }>();
  useEffect(scrollToFilmTitle);

  useEffect(() => {
    const result = films.find((item) => +item.id === +id);

    if (result) {
      setFilm(result);
      setIsLoading(false);
      return;
    }

    fetchFilm(id)
      .then((data) => {
        setFilm(data);
        setIsLoading(false);
      });
  }, [ films, id ]);

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  if (!film) {
    return <NotFound/>;
  }

  const { posterImage, backgroundImage, name } = film;
  const breadcrumbsElement = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Add review</span>
        </li>
      </ul>
    </nav>
  );

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header breadcrumbs={breadcrumbsElement}/>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={posterImage}
            alt={`${name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>
    </section>
  );
}

export { AddReview };
export default connector(AddReview);