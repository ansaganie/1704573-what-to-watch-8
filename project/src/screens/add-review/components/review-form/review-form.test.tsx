import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

describe('Screen: Add review. Component: Review Form', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore()}>
        <ReviewForm rating={0} filmId={''}/>
      </Provider>,
    );
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
