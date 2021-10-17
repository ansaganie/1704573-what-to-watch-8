import React from 'react';
import { reviews } from '../../mock/reviews';
import ReviewItem from './review-item';

type ReviewsProps = {
  filmId: string,
}

function Reviews(props: ReviewsProps): JSX.Element {
  const filmReviews = reviews.filter(({ filmId }) => filmId === props.filmId);

  if (filmReviews.length === 0) {
    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          <h1 className="film-card__title">There is no review on this film yet</h1>
        </div>
      </div>
    );
  }

  const reviewElements = filmReviews
    .map((review) => <ReviewItem key={review.date.toLocaleString()} review={review}/>);
  const countOfItemsInColumn = Math.ceil(reviewElements.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewElements.slice(0, countOfItemsInColumn)}
      </div>
      <div className="film-card__reviews-col">
        {reviewElements.slice(countOfItemsInColumn)}
      </div>
    </div>
  );
}

export default Reviews;