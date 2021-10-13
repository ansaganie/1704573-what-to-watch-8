import React, { useState } from 'react';

function ReviewForm(): JSX.Element {
  const [ rating, setRating ] = useState(0);
  const [ text, setText ] = useState('');

  const onRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.target.value);
  };

  const onTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };

  const ratingElement: JSX.Element[] = [];
  for (let i = 10; i >= 1; i--) {
    ratingElement.push(
      <React.Fragment>
        <input
          key={`rating-input${i}`}
          className="rating__input"
          id={`star-${i}`}
          type="radio"
          name="rating"
          value={i}
          checked={rating === i}
        />
        <label
          className="rating__label"
          htmlFor={`star-${i}`}
          key={`rating-label${i}`}
        >
          Rating {i}
        </label>
      </React.Fragment>,
    );
  }

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars" onChange={onRatingChange}>
          {ratingElement}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={text}
          onChange={onTextChange}
        />

        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
