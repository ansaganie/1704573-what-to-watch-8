// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Actions } from './store/store';

const scrollTo = jest.fn();

const unknownAction = (): Actions => ({ type: 'UNKNOWN_ACTION'} as unknown as Actions);

window.scrollTo = scrollTo;

Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', {
  get: () => false,
  set: jest.fn(),
});

export {
  scrollTo,
  unknownAction
};
