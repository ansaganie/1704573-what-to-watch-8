import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getFakeFilm } from '../../utils/mock';
import * as reduxHooks from 'react-redux';
import * as useLoadFilm from '../../hooks/use-load-film';
import * as Header from '../../components/header/header';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { PromoFilm } from './promo-film';
import { AuthStatus } from '../../constants';


describe('Screen: Main. Component: Promo film', () => {
  it('should render correctly', () => {
    const film = getFakeFilm();
    const dispatch = jest.fn();

    const state = {
      film: {
        myListButtonDisabled: false,
      },
    };

    const mockStore = configureMockStore();

    jest.spyOn(reduxHooks, 'useDispatch')
      .mockImplementation(() => dispatch);

    jest.spyOn(Header, 'default')
      .mockImplementation(() => (<div/>));

    jest.spyOn(useLoadFilm, 'default')
      .mockImplementation(() => [ film, false]);


    act(() => {
      render(
        <Provider store={mockStore(state)}>
          <Router history={createMemoryHistory()}>
            <PromoFilm
              promoFilmId={film.id}
              authStatus={AuthStatus.Auth}
              dispatch={jest.fn()}
            />
          </Router>
        </Provider>,
      );
    });

    expect(screen.getByText(film.name)).toBeInTheDocument();
  });
});
