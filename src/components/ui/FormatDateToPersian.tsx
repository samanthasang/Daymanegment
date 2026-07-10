import dayjs from "dayjs";
import { format } from "date-fns-jalali";

// Shared Persian month names
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
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه",
	"شنبه",
];

export const toPersianDate = (
	year: number,
	month: number,
	day: number,
	weekday: number,
): string => {
	const persianYear = year - 621;
	const persianMonth = PERSIAN_MONTHS[month];
	const persianDay = day;
	const persianWeekday = PERSIAN_WEEKDAYS[weekday];

	return `${persianWeekday} ${persianDay} ${persianMonth} ${persianYear}`;
};

export const formatDate = (date: Date | undefined, lang: string): string => {
	if (!date) return "";
	const d = dayjs(date);
	console.log(format(new Date(2014, 1, 11), "yyyy-MM-dd"));

	return lang === "fa"
		? toPersianDate(d.year(), d.month(), d.date(), d.day())
		: d.format("dddd, MMMM D, YYYY");
};
