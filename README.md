# schedule-graph

Модуль предназначен для определения вхождения даты в недельное расписание.

Отчет дня недели идет с понедельника.
`0` - понедельник
`6` - воскресенье


## Пример использования
```javascript
import scheduleGraph from 'schedule-graph';

const checkDate = scheduleGraph({
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
});

/*
Согласно выше заданному графику в пятницу доступное время с 10:30 до 23:15
*/

const date = new Date(2021, 5, 4, 11, 34); // 11:34 4 июня 2021 - пятница, номер дня недели - 4
const result = checkDate(date); // true

const date2 = new Date(2021, 5, 4, 7, 0);  // 7:00 4 июня 2021 - пятница, номер дня недели - 4
const result2 = checkDate(date2) // false
```

Формат времени `hh:mm`

Создано на основе [`этого`](https://github.com/metachris/typescript-boilerplate) шаблона.
