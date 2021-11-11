import { distinctFilter, formatRating, getFilmRatingDescription } from './film';

describe('Utility functions for film pages', () => {
  it('should return right film\'s rating description', () => {
    expect(getFilmRatingDescription(-1)).toBe('');
    expect(getFilmRatingDescription(0)).toBe('Bad');
    expect(getFilmRatingDescription(1)).toBe('Bad');
    expect(getFilmRatingDescription(2)).toBe('Bad');
    expect(getFilmRatingDescription(3)).toBe('Normal');
    expect(getFilmRatingDescription(4)).toBe('Normal');
    expect(getFilmRatingDescription(5)).toBe('Good');
    expect(getFilmRatingDescription(6)).toBe('Good');
    expect(getFilmRatingDescription(7)).toBe('Good');
    expect(getFilmRatingDescription(8)).toBe('Very good');
    expect(getFilmRatingDescription(9)).toBe('Very good');
    expect(getFilmRatingDescription(10)).toBe('Awesome');
    expect(getFilmRatingDescription(11)).toBe('');
  });

  it('should convert number to float with one place after comma, and with comma instead of dot', () => {
    expect(formatRating(0)).toBe('0,0');
    expect(formatRating(1)).toBe('1,0');
    expect(formatRating(1.5456654)).toBe('1,5');
    expect(formatRating(5.5)).toBe('5,5');
    expect(formatRating(10.0)).toBe('10,0');
  });

  it('should return only unique elements', () => {
    expect([0, 1, 2, 3, 3, 2, 1, 4].filter(distinctFilter)).toEqual([ 0, 1, 2, 3, 4]);
    expect(['0', '1', '2', '3', '3', '2', '1', '4'].filter(distinctFilter)).toEqual([ '0', '1', '2', '3', '4']);
  });
});
