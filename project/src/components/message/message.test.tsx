import { render, screen } from '@testing-library/react';
import Message from './message';

describe('Component: Message', () => {
  it('should render correctly', () => {
    const message = 'This is Message';

    render(<Message message={message}/>);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
