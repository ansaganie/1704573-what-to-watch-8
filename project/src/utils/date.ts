import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format).toString();

const convertMinutesToHours = (period: number): string => {
  if (period === 0) {
    return '00m';
  }

  return dayjs
    .duration(period, 'minutes')
    .format('HH[h] mm[m]');
};

const convertSecondsToHours = (period: number): string =>
  dayjs
    .duration(period, 'seconds')
    .format('HH:mm:ss')
    .replace('00:', '');

export {
  convertMinutesToHours,
  convertSecondsToHours,
  formatDate
};
