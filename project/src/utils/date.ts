import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDate = (date: Date, format: string): string =>
  dayjs(date).format(format).toString();

const convertMinutesToHours = (period: number): string => {
  if (period === 0) {
    return '00m';
  }

  const [hours, minutes] = dayjs
    .duration(period, 'minutes')
    .format('HH-mm')
    .split('-');

  const hoursOutput = parseInt(hours, 10) > 0 ? `${hours}h` : '';
  const minutesOutput = parseInt(minutes, 10) > 0 ? `${minutes}m` : '';

  return `${hoursOutput} ${minutesOutput}`;
};

export { convertMinutesToHours, formatDate };
