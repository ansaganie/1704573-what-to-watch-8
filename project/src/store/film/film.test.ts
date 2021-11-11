import { setMyListButtonDisabled } from './film-actions';
import { filmReducer } from './film-reducer';


describe('Film reducer', () => {
  it('should set mylist button disabled', () => {
    expect( filmReducer( undefined, setMyListButtonDisabled(true))).toEqual({
      myListButtonDisabled: true,
    });
  });
});
