import moment from "moment";
import { CalendarStates } from "../constants/calendar";

export const dateFormat = (date) => {
  return moment(date).format("YYYY년 MM월 DD일");
};

export const dateToTimeFormat = (date) => {
  return moment(date).format("HH:mm");
};

export const serverDateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const compareDates = (date1, date2) => {
  return dateFormat(date1) === dateFormat(date2);
};

export const timeFormatToDate = (timeFormat) => {
  const [hours, minutes] = timeFormat.split(":");
  const today = new Date();

  today.setHours(hours);
  today.setMinutes(minutes);

  return today;
};

export const tutoringTimeFormat = (date, startTime) => {
  // "tutoringTime":"2023-06-13T15:30:00"
  const dateObj = new Date(date);

  const [hours, minutes] = startTime.split(":");

  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);

  return moment(dateObj).format("YYYY-MM-DDTHH:mm:SS");
};

export const makeMarkedDatesByNoteList = (noteListInfo) => {
  const result = {};

  if (noteListInfo) {
    for (let i = 0; i < noteListInfo.length; i++) {
      const color = noteListInfo[i].color;
      const noteList = noteListInfo[i].noteList;

      if (noteList.length > 0) {
        for (let j = 0; j < noteList.length; j++) {
          const dateNum = noteList[j].date;
          const noteId = noteList[j].noteId;

          const target = result[dateNum];
          if (!target) {
            result[dateNum] = [{ noteId, color }];
          } else {
            result[dateNum] = [...target, { noteId, color }];
          }
        }
      }
    }
  }

  // console.log(result);

  return result;
};

export const noteCalendarDays = (month, year, noteListInfo) => {
  // 이전 달
  const prev = new Date(year, month - 1, 0);
  // 선택한 연/달
  const curr = new Date(year, month, 0);
  // 다음 달
  const next = new Date(year, month + 1, 0);
  const prevLastDate = prev.getDate();
  const prevLastDay = prev.getDay();
  const currLastDate = curr.getDate();
  const currLastDay = curr.getDay();

  const result = [];
  let index = 0;

  const markedDates = makeMarkedDatesByNoteList(noteListInfo);

  // 이전 달
  for (let i = prevLastDay; i < 6 && i >= 0; i--) {
    const num = prevLastDate - i;
    const date = new Date(prev.getFullYear(), prev.getMonth(), num);
    const day = date.getDay() + 1;
    result.push({
      date,
      day,
      num,
      state: CalendarStates.prev,
      mark: false,
      noteList: [],
    });
    index++;
  }

  // 선택한 연/달
  for (let i = 1; i <= currLastDate; i++) {
    const day = (index % 7) + 1;
    const num = i;
    const state =
      day === 1
        ? CalendarStates.sun
        : day === 7
        ? CalendarStates.sat
        : CalendarStates.weekday;
    const date = new Date(curr.getFullYear(), curr.getMonth(), num);
    const mark = markedDates[num] ? true : false;
    const noteList = markedDates[num] ? markedDates[num] : [];

    result.push({
      state,
      day,
      num,
      date,
      mark,
      noteList,
    });
    index++;
  }

  // 다음 달
  for (let i = 1; i < 7 - currLastDay; i++) {
    const date = new Date(next.getFullYear(), next.getMonth(), i);
    const day = date.getDay() + 1;
    const num = i;

    result.push({
      state: CalendarStates.next,
      num,
      date,
      day,
      mark: false,
      noteList: [],
    });
  }

  return result;
};

export const makeMarkedDatesByTutoringIndex = (tutoringList) => {
  const result = {};

  if (tutoringList) {
    for (let i = 0; i < tutoringList.length; i++) {
      const scheduleList = tutoringList[i].scheduleList;

      for (let j = 0; j < scheduleList.length; j++) {
        const dateNum = scheduleList[j].date;
        const target = result[dateNum];
        if (!target) {
          result[dateNum] = [i];
        } else {
          result[dateNum] = [...target, i];
        }
      }
    }
  }

  return result;
};

export const calendarDays = (month, year, tutoringList) => {
  // 이전 달
  const prev = new Date(year, month - 1, 0);
  // 선택한 연/달
  const curr = new Date(year, month, 0);
  // 다음 달
  const next = new Date(year, month + 1, 0);
  const prevLastDate = prev.getDate();
  const prevLastDay = prev.getDay();
  const currLastDate = curr.getDate();
  const currLastDay = curr.getDay();

  const result = [];
  let index = 0;

  const markedDates = makeMarkedDatesByTutoringIndex(tutoringList);

  // 이전 달
  for (let i = prevLastDay; i < 6 && i >= 0; i--) {
    const num = prevLastDate - i;
    const date = new Date(prev.getFullYear(), prev.getMonth(), num);
    const day = date.getDay() + 1;
    result.push({
      date,
      day,
      num,
      state: CalendarStates.prev,
      mark: false,
      tutoringIndices: [],
    });
    index++;
  }

  // 선택한 연/달
  for (let i = 1; i <= currLastDate; i++) {
    const day = (index % 7) + 1;
    const num = i;
    const state =
      day === 1
        ? CalendarStates.sun
        : day === 7
        ? CalendarStates.sat
        : CalendarStates.weekday;
    const date = new Date(curr.getFullYear(), curr.getMonth(), num);
    const mark = markedDates[num] ? true : false;

    result.push({
      state,
      day,
      num,
      date,
      mark,
      tutoringIndices: markedDates[num],
    });
    index++;
  }

  // 다음 달
  for (let i = 1; i < 7 - currLastDay; i++) {
    const date = new Date(next.getFullYear(), next.getMonth(), i);
    const day = date.getDay() + 1;
    const num = i;

    result.push({
      state: CalendarStates.next,
      num,
      date,
      day,
      mark: false,
      tutoringIndices: [],
    });
  }

  return result;
};

export const getTotalDays = (selectedMonth, selectedYear, scheduleList) => {
  const prev = new Date(selectedYear, selectedMonth - 1, 0);
  const curr = new Date(selectedYear, selectedMonth, 0);
  const next = new Date(selectedYear, selectedMonth + 1, 0);
  const prevLastDate = prev.getDate();
  const prevLastDay = prev.getDay();
  const currLastDate = curr.getDate();
  const currLastDay = curr.getDay();

  // days = [
  //     {
  //         state: prev, weekday, sat, sun, next,
  //         num: 날짜(일),
  //         date: 날짜,
  //         day: 1 ~ 7,
  //         mark: true or false
  //     }
  // ]
  const days = [];
  let index = 0;
  const markDate = {};

  if (scheduleList) {
    for (let i = 0; i < scheduleList.length; i++) {
      const date = scheduleList[i].date;
      markDate[date] = true;
    }
  }

  // prev month
  for (let i = prevLastDay; i < 6 && i >= 0; i--) {
    const date = new Date(
      prev.getFullYear(),
      prev.getMonth(),
      prevLastDate - i
    );
    const day = date.getDay() + 1;

    days.push({
      state: CalendarStates.prev,
      num: prevLastDate - i,
      date,
      day,
      mark: false,
    });
    index++;
  }

  // curr month
  for (let i = 1; i <= currLastDate; i++) {
    const day = index % 7;
    const state =
      day === 0
        ? CalendarStates.sun
        : day === 6
        ? CalendarStates.sat
        : CalendarStates.weekday;
    const date = new Date(curr.getFullYear(), curr.getMonth(), i);
    const mark = markDate[i] ? true : false;

    days.push({
      state,
      num: i,
      date,
      day: date.getDay() + 1,
      mark,
    });
    index++;
  }
  // next month
  for (let i = 1; i < 7 - currLastDay; i++) {
    const date = new Date(next.getFullYear(), next.getMonth(), i);
    const day = date.getDay() + 1;

    days.push({
      state: CalendarStates.next,
      num: i,
      date,
      day,
      mark: false,
    });
  }

  return days;
};

export const Day = {
  1: "월요일",
  2: "화요일",
  3: "수요일",
  4: "목요일",
  5: "금요일",
  6: "토요일",
  7: "일요일",
};
