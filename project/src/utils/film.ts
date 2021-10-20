const getFilmRatingDescription = (rating: number): string => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  }

  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }

  if (rating >= 5 && rating < 8) {
    return 'Good';
  }

  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }

  if (rating === 10) {
    return 'Awesome';
  }

  return 'Unknown';
};

const formatRating = (rating: number): string =>
  rating.toFixed(1).replace('.', ',');

export { getFilmRatingDescription, formatRating };
