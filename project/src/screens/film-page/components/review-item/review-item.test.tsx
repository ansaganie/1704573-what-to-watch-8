import { render, screen } from '@testing-library/react';
import { formatDate } from '../../../../utils/date';
import { formatRating } from '../../../../utils/film';
import { getFakeReview } from '../../../../utils/mock';
import ReviewItem from './review-item';

describe('Screen: Film Page. Component: Review Item', () => {
  it('should render correctly', () => {
    const review = getFakeReview();
    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(formatDate(review.date, 'MMMM DD, YYYY'))).toBeInTheDocument();
    expect(screen.getByText(formatRating(review.rating))).toBeInTheDocument();
  });
});
