import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format).toString();

const formatFilmDuration = (period: number): string => dayjs
  .duration(period, 'minutes')
  .format('HH[h] mm[m]');

const formatTimeElapsed = (period: number): string =>
  dayjs
    .duration(period, 'seconds')
    .format('-HH:mm:ss')
    .replace('00:', '');

export {
  formatFilmDuration,
  formatTimeElapsed,
  formatDate
};
