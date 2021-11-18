import { act, render, screen } from '@testing-library/react';
import Spinner from './Spinner';

const SPINNER_ID = 'spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    act(() => {
      render(<Spinner/>);
    });

    expect(screen.getByTestId(SPINNER_ID)).toBeInTheDocument();
  });
});
