import { unknownAction } from '../unknown';
import { setMyListButtonDisabled } from './film-actions';
import { filmReducer } from './film-reducer';


describe('Film reducer', () => {
  it('should return state unchanged with unknown action', () => {
    expect( filmReducer( undefined, unknownAction())).toEqual({
      myListButtonDisabled: false,
    });
  });
  it('should set mylist button disabled', () => {
    expect( filmReducer( undefined, setMyListButtonDisabled(true))).toEqual({
      myListButtonDisabled: true,
    });
  });
});
