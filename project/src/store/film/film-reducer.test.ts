import { getFakeFilm, getFakeReview, getFakeReviews } from '../../utils/mock';
import { unknownAction } from '../../setupTests';
import { addReview, setFilmNotFound, setIsFilmLoading, setIsReviewsLoading, setMyListButtonDisabled, setReviews } from './film-actions';
import { filmReducer } from './film-reducer';

const initialState = {
  myListButtonDisabled: false,
  isFilmLoading: false,
  reviews: {},
  isReviewsLoading: false,
  notFoundFilmId: '',
};

describe('Film reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( filmReducer( undefined, unknownAction())).toEqual({
      ...initialState,
    });
  });
  it('should set mylist button disabled', () => {
    expect( filmReducer( undefined, setMyListButtonDisabled(true))).toEqual({
      ...initialState,
      myListButtonDisabled: true,
    });
  });
  it('should set is film loading to "true"', () => {
    expect( filmReducer( undefined, setIsFilmLoading(true))).toEqual({
      ...initialState,
      isFilmLoading: true,
    });
  });

  it('should set is film loading to "false"', () => {
    expect( filmReducer( undefined, setIsFilmLoading(false))).toEqual({
      ...initialState,
      isFilmLoading: false,
    });
  });

  it('should set reviews to given film id', () => {
    const reviews = getFakeReviews();
    const filmId = getFakeFilm().id;

    expect( filmReducer( undefined, setReviews(filmId, reviews))).toEqual({
      ...initialState,
      reviews: {
        [filmId]: reviews,
      },
    });
  });

  it('should set reviews is loading to "true"', () => {
    expect( filmReducer( undefined, setIsReviewsLoading(true))).toEqual({
      ...initialState,
      isReviewsLoading: true,
    });
  });

  it('should set reviews is loading to "false"', () => {
    expect( filmReducer( undefined, setIsReviewsLoading(false))).toEqual({
      ...initialState,
      isReviewsLoading: false,
    });
  });

  it('should add review to given film id', () => {
    const reviews = getFakeReviews();
    const review = getFakeReview();
    const filmId = getFakeFilm().id;

    const state = {
      ...initialState,
      reviews: {
        [filmId]: reviews,
      },
    };

    expect( filmReducer( state, addReview(filmId, review))).toEqual({
      ...initialState,
      reviews: {
        [filmId]: [...reviews, review],
      },
    });
  });

  it('should set not found film id', () => {
    const filmId = getFakeFilm().id;

    expect( filmReducer( undefined, setFilmNotFound(filmId))).toEqual({
      ...initialState,
      notFoundFilmId: filmId,
    });
  });
});
