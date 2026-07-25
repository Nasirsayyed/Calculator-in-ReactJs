export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function calculateAge(birthDate: Date, asOf: Date = new Date()): AgeResult {
  if (Number.isNaN(birthDate.getTime()) || birthDate > asOf) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  let years = asOf.getFullYear() - birthDate.getFullYear();
  let months = asOf.getMonth() - birthDate.getMonth();
  let days = asOf.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOf.getTime() - birthDate.getTime()) / MS_PER_DAY);
  return { years, months, days, totalDays };
}
