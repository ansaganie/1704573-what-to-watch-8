import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeFilm } from '../../utils/mock';
import * as hooks from '../../hooks/use-load-film';
import * as header from '../../components/header/header';
import Player from './player';

const mockStore = configureMockStore();

describe('Screen: Player', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    const playButtonLabel = 'Play';

    jest.spyOn(hooks, 'useLoadFilm')
      .mockImplementation(() => [film, false]);

    const history = createMemoryHistory();
    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <Player/>
        </Router>
      </Provider>,
    );

    const playButton = screen.getByText(playButtonLabel);
    expect(playButton).toBeInTheDocument();
  });

  it('should render correctly when film is null', () => {
    jest.spyOn(hooks, 'useLoadFilm')
      .mockImplementation(() => [null, false]);
    jest.spyOn(header, 'default')
      .mockImplementation(() => (<div/>));

    const history = createMemoryHistory();
    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <Player/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByAltText('poster')).not.toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
