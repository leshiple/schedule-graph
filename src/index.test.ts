import schedule, { validate, checkIsTimeSting, setTime } from './index';

const weekSchedule = [
  {
    start: '07:00',
    end: '18:00'
  },
  {
    start: '08:00',
    end: '19:00'
  },
  {
    start: '09:00',
    end: '22:00'
  },
  {
    start: '10:00',
    end: '23:00'
  },
  {
    start: '10:30',
    end: '23:15'
  },
  {
    start: '10:45',
    end: '23:30'
  },
  {
    start: '10:59',
    end: '23:59'
  }
];
const brokenWeekSchedule1 = weekSchedule.slice(0, 6);
const brokenWeekSchedule2 = [...brokenWeekSchedule1, {
  start: '8:20',
  end: '10:30'
}];

const trueDate = new Date(2021, 5, 4, 11, 34);
const falseDate = new Date(2021, 5, 4, 7, 0);
const falseDate2 = new Date(2021, 5, 4, 23, 50);
const compareDate = new Date(2021, 5, 4, 10, 0);
const compareDate2 = new Date(2021, 5, 4, 14, 27);

test('checkIsTimeSting', () => {
  expect(checkIsTimeSting('Foo')).toBeFalsy();
  expect(checkIsTimeSting('11:78')).toBeFalsy();
  expect(checkIsTimeSting('51:78')).toBeFalsy();
  expect(checkIsTimeSting('51:11')).toBeFalsy();
  expect(checkIsTimeSting('11:30')).toBeTruthy();
});


test('validate', () => {
  expect(validate(weekSchedule[0])).toBeTruthy();
  expect(validate(brokenWeekSchedule2[6])).toBeFalsy();
});

test('setTime', () => {
  const result = setTime(compareDate, '14:27');
  const result2 = setTime(compareDate, '22:11');

  expect(result).toEqual(compareDate2);
  expect(result2).not.toEqual(compareDate2);
});

test('main', () => {
  expect(() => schedule(brokenWeekSchedule1)).toThrowError('weekSchedule should be an array with length 7');
  expect(schedule(weekSchedule)(trueDate)).toBeTruthy();
  expect(schedule(weekSchedule)(falseDate)).toBeFalsy();
  expect(schedule(weekSchedule)(falseDate2)).toBeFalsy();
});
