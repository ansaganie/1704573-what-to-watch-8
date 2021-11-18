import React, { useState, Fragment, useCallback } from 'react';
import styles from './review-form.module.css';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { postReview } from '../../../../services/dal';
import { setReviews } from '../../../../store/film/film-actions';
import { toast } from 'react-toastify';

const RATING_VALUES = [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;
const POST_SUCCESS = 'Thank you for your review';

type ReviewFormProps = {
  rating: number,
  filmId: string,
}

function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { filmId, rating } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const [ userRating, setUserRating ] = useState(Math.trunc(rating));
  const [ comment, setComment ] = useState('');
  const [ isRatingValid, setIsRatingValid ] = useState(false);
  const [ isCommentValid, setIsCommentValid ] = useState(false);
  const [ error, setError ] = useState('');

  const [ isSubmitting, setSubmitting ] = useState(false);

  const validateComment = useCallback(() => {
    if (comment.length < COMMENT_MIN_LENGTH) {
      setError(`Review must be at least ${COMMENT_MIN_LENGTH} characters.
      Need ${COMMENT_MIN_LENGTH - comment.length} more`);
      setIsCommentValid(false);

      return;
    }

    if (comment.length > COMMENT_MAX_LENGTH) {
      setError(`Review must not be more than ${COMMENT_MAX_LENGTH} characters`);
      setIsCommentValid(false);

      return;
    }

    setError('');
    setIsCommentValid(true);
  }, [comment]);

  const validateRating = useCallback(() => {
    if (userRating === 0) {
      setError('Rating must be at least 1 star');
      setIsRatingValid(false);

      return;
    }

    setError('');
    setIsRatingValid(true);
  }, [userRating]) ;

  const formChangeHandler = () => {
    validateRating();
    validateComment();
  };

  const ratingChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserRating(+evt.target.value);
  };

  const commentChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const formSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();

    validateComment();
    validateRating();

    if (isCommentValid && isRatingValid) {
      setSubmitting(true);
      postReview(filmId, { comment, rating: userRating })
        .then((review) => {
          review && dispatch(setReviews(filmId, review));

          setSubmitting(false);
          toast.success(POST_SUCCESS);
          history.push(AppRoute.getFilmsLink(filmId));
        });
    }
  };

  return (
    <form
      className="add-review__form"
      onSubmit={formSubmitHandler}
      onChange={formChangeHandler}
    >
      <div className="rating">
        <div className="rating__stars">
          {
            RATING_VALUES.map((value) => (
              <Fragment key={`rating-input${value}`}>
                <input
                  className="rating__input"
                  id={`star-${value}`}
                  type="radio"
                  name="rating"
                  value={value}
                  checked={userRating === value}
                  onChange={ratingChangeHandler}
                  disabled={isSubmitting}
                />
                <label
                  className="rating__label"
                  htmlFor={`star-${value}`}
                >
                  Rating {value}
                </label>
              </Fragment>
            ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="review-text"
          placeholder="Review text"
          value={comment}
          onChange={commentChangeHandler}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!isCommentValid || !isRatingValid || isSubmitting}
          >
            Post
          </button>
        </div>
      </div>
      <div className={styles.errorMessage}>
        {error || ''}
      </div>
    </form>
  );
}

export default ReviewForm;
