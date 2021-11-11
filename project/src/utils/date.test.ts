import { formatFilmDuration, formatTimeElapsed } from './date';

describe('Utility functions for date utility', () => {
  it('should convert period in minutes into string in format 01h 55m', () => {
    expect(formatFilmDuration(60)).toBe('01h 00m');
    expect(formatFilmDuration(30)).toBe('00h 30m');
    expect(formatFilmDuration(100)).toBe('01h 40m');
    expect(formatFilmDuration(0)).toBe('00h 00m');
  });

  it('should convert period in seconds into string in format -HH:MM:SS', () => {
    expect(formatTimeElapsed(200)).toBe('-03:20');
    expect(formatTimeElapsed(1432)).toBe('-23:52');
    expect(formatTimeElapsed(5000)).toBe('-01:23:20');
    expect(formatTimeElapsed(10000)).toBe('-02:46:40');
  });
});
