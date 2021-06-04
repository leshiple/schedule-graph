interface ScheduleItem {
  start: string
  end: string
}

const MAX_HOURS = 23;
const MIN_HOURS = 0;
const MAX_MINUTES = 59;
const MIN_MINUTES = 0;

type Func = (data: Date) => boolean;

export default (weekSchedule: ScheduleItem[]): Func => {
  if (!Array.isArray(weekSchedule) || weekSchedule.length !== 7) {
    throw new Error('weekSchedule should be an array with length 7');
  }

  const isNotValid = !weekSchedule.every(validate);

  if (isNotValid) {
    throw new Error('Items of weekSchedule is not valid');
  }

  return (date: Date): boolean => {
    const index = date.getDay();
    const weekDay = index === 0 ? 6 : index - 1;
    const { start, end } = weekSchedule[weekDay];

    const startDate = setTime(date, start);

    const endDate = setTime(date, end);

    return date >= startDate && date <= endDate;
  }
}

export function validate(scheduleItem: ScheduleItem): boolean {
  const isValidStart = checkIsTimeSting(scheduleItem.start);
  const isValidEnd = checkIsTimeSting(scheduleItem.end);

  return isValidStart && isValidEnd;
}

export function checkIsTimeSting(time: string): boolean {
  const reg = /\d{2}:\d{2}/gm;

  const isNotValidReg = !reg.test(time);

  if (isNotValidReg) {
    return false;
  }

  const [h, m] = time.split(':');
  const hours = Number(h);
  const minutes = Number(m);

  const isValidHours = hours <= MAX_HOURS && hours >= MIN_HOURS;
  const isValidMinutes = minutes <= MAX_MINUTES && minutes >= MIN_MINUTES;

  return isValidHours && isValidMinutes;
}

export function setTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':');

  const newDate = new Date(date.getTime())
  newDate.setHours(Number(hours));
  newDate.setMinutes(Number(minutes));

  return newDate;
}
