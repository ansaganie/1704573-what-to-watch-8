import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeFilms } from '../../utils/mock';
import * as redux from 'react-redux';
import MyListScreen from './my-list-screen';

const mockStore = configureMockStore();
const state = {
  user: {
    myList: getFakeFilms(),
    isMyListLoading: false,
  },
};

describe('Screen: My List', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    jest.spyOn(redux, 'useDispatch')
      .mockImplementation(() => dispatch);

    render(
      <Provider store={mockStore(state)}>
        <Router history={createMemoryHistory()}>
          <MyListScreen/>
        </Router>
      </Provider>,
    );

    const list = state.user.myList.map((film) => screen.getByText(film.name));
    expect(list.length).toBe(state.user.myList.length);
    expect(dispatch).toBeCalled();
  });
});
