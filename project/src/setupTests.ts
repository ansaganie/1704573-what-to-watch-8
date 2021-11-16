// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const play = jest.fn().mockReturnValue(Promise.resolve());
const load = jest.fn();
const pause = jest.fn();

window.HTMLMediaElement.prototype.load = load;
window.HTMLMediaElement.prototype.play = play;
window.HTMLMediaElement.prototype.pause = pause;

export {
  play,
  load,
  pause
};
