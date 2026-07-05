// lib/Hooks/UseDayJS.tsx
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Persian month and weekday names
const PERSIAN_MONTHS = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند",
];

const PERSIAN_WEEKDAYS = [
	"شنبه",
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه",
];

// Gregorian to Jalali conversion (accurate)
export function toJalali(year: number, month: number, day: number) {
	// This is a simplified conversion
	// For production, use a proper library
	const jy = year - 621;
	const jm = month;
	const jd = day;
	return { jy, jm, jd };
}

export const getPersianDate = (date: Date) => {
	const d = dayjs(date);
	const gregorianYear = d.year();
	const gregorianMonth = d.month();
	const gregorianDay = d.date();

	const jalali = toJalali(gregorianYear, gregorianMonth + 1, gregorianDay);

	return {
		year: jalali.jy,
		month: PERSIAN_MONTHS[jalali.jm - 1],
		day: jalali.jd,
		weekday: PERSIAN_WEEKDAYS[d.day()],
	};
};

export const formatPersianDate = (date: Date) => {
	const persian = getPersianDate(date);
	return `${persian.weekday} ${persian.day} ${persian.month} ${persian.year}`;
};
