import { render, screen } from '@testing-library/react';
import ServerNotWorking from './server-not-working';

const  SERVER_NOT_WORKING_MESSAGE = 'Sorry for inconvenience. We are working to fix it';

describe('Screen: Server Not Working', () => {
  it('should render correctly', () => {
    render(<ServerNotWorking/>);

    expect(screen.getByText(SERVER_NOT_WORKING_MESSAGE)).toBeInTheDocument();
  });
});
