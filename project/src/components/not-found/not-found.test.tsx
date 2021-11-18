import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import * as Header from '../header/header';
import NotFound from './not-found';

describe('Screen: Not Found 404', () => {
  it('should render correctly', () => {
    const label = '404';
    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));

    render(
      <Router history={createMemoryHistory()}>
        <NotFound/>
      </Router>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
