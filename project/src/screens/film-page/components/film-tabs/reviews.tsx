import React, { useEffect, useState } from 'react';
import ReviewItem from './review-item';
import { Review } from '../../../../types/review';
import { fetchComments } from '../../../../services/dal';
import Spinner from '../../../../components/spinner/Spinner';
import Message from '../../../../components/message/message';

const NO_REVIEW_MESSAGE = 'No review for this film. Please add some';

type ReviewsProps = {
  filmId: string,
}

function Reviews(props: ReviewsProps): JSX.Element {
  const { filmId } = props;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ reviews, setReviews ] = useState<Review[]>([]);

  useEffect(() => {
    fetchComments(filmId)
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      });
  }, [filmId]);

  if (isLoading) {
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

export default Reviews;
