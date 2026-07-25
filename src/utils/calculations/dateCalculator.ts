export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function calculateDateDifference(dateA: Date, dateB: Date): DateDifferenceResult {
  if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  const [start, end] = dateA <= dateB ? [dateA, dateB] : [dateB, dateA];

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
  return { years, months, days, totalDays };
}

export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
