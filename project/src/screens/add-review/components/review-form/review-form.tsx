import React, { useState, Fragment } from 'react';
import { postComments } from '../../../../services/dal';
import { useHistory } from 'react-router-dom';
import styles from './review-form.module.css';
import { AppRoute } from '../../../../constants';

const RATING_VALUES = [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;

type ReviewFormProps = {
  filmId: string,
}

function ReviewForm(props: ReviewFormProps): JSX.Element {
  const { filmId } = props;

  const history = useHistory();

  const [ rating, setRating ] = useState(1);
  const [ comment, setComment ] = useState('');
  const [ isRatingValid, setIsRatingValid ] = useState(false);
  const [ isCommentValid, setIsCommentValid ] = useState(false);
  const [ error, setError ] = useState('');

  const [ isSubmitting, setSubmitting ] = useState(false);

  const onRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.target.value);
    validateRating();
  };

  const onCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    validateComment();
  };

  const formSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();

    validateComment();
    validateRating();

    if (isCommentValid && isRatingValid) {
      setSubmitting(true);
      postComments(filmId, { comment, rating })
        .then(() => {
          setSubmitting(false);
          history.push(AppRoute.FilmPage.replace(':id', filmId.toString()));
        });
    }
  };

  const validateComment = () => {
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
  };

  const validateRating = () => {
    if (rating === 0) {
      setError('Rating must be at least 1 star');
      setIsRatingValid(false);
      return;
    }

    setError('');
    setIsRatingValid(true);
  };

  return (
    <form
      className="add-review__form"
      onSubmit={formSubmitHandler}
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
                  checked={rating === value}
                  onChange={onRatingChange}
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
          onChange={onCommentChange}
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
