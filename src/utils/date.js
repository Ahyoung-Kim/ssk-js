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
