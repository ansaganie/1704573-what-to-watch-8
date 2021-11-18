// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Actions } from './store/store';

const play = jest.fn().mockReturnValue(Promise.resolve());
const load = jest.fn();
const pause = jest.fn();
const scrollTo = jest.fn();

const unknownAction = (): Actions => ({ type: 'UNKNOWN_ACTION'} as unknown as Actions);

window.HTMLMediaElement.prototype.load = load;
window.HTMLMediaElement.prototype.play = play;
window.HTMLMediaElement.prototype.pause = pause;
window.scrollTo = scrollTo;

Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', {
  get: () => false,
  set: jest.fn(),
});

export {
  play,
  load,
  pause,
  scrollTo,
  unknownAction
};
