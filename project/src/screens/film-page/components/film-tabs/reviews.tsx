import React, { memo, useEffect } from 'react';
import ReviewItem from './review-item';
import Spinner from '../../../../components/spinner/Spinner';
import Message from '../../../../components/message/message';
import { useDispatch, useSelector } from 'react-redux';
import { getIsReviewsLoading, getReviewsByFilmId } from '../../../../store/film/film-selectors';
import { State } from '../../../../store/store';
import { fetchReviews } from '../../../../store/film/film-thunks';

const NO_REVIEW_MESSAGE = 'No review for this film. Please add some';

type ReviewsProps = {
  filmId: string,
}

function Reviews(props: ReviewsProps): JSX.Element {
  const { filmId } = props;
  const dispatch = useDispatch();
  const isReviewsLoading = useSelector(getIsReviewsLoading);
  const reviews = useSelector((state: State) => getReviewsByFilmId(state, filmId));

  useEffect(() => {
    dispatch(fetchReviews(filmId));
  }, [filmId, dispatch]);

  if (reviews === undefined || isReviewsLoading) {
    return (
      <div className="film-card__reviews film-card__row">
        <Spinner/>
      </div>
    );
  }

  const reviewElements = reviews
    .map((review) => <ReviewItem key={review.date.toLocaleString()} review={review}/>);
  const countOfItemsInColumn = Math.ceil(reviewElements.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      {
        reviews.length === 0 &&
        <Message
          message={NO_REVIEW_MESSAGE}
          fontSize={20}
          lightBackground
        />
      }
      <div className="film-card__reviews-col">
        {reviewElements.slice(0, countOfItemsInColumn)}
      </div>
      <div className="film-card__reviews-col">
        {reviewElements.slice(countOfItemsInColumn)}
      </div>
    </div>
  );
}

export default memo(Reviews);
