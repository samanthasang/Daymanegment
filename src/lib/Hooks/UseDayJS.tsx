import dayjs, { ManipulateType } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import jalaliday from "jalaliday";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

if (typeof window !== "undefined") {
	dayjs.extend(jalaliday);
}

export const currentUnixTimestamp = dayjs(
	Math.floor(new Date().getTime()),
).unix();

export const zeroHour = new Date().setHours(0, 0, 0, 0);

export const currentUnixTimestampZero = Math.floor(
	new Date(zeroHour).getTime() / 1000.0,
);
export const DayUnix = (date: string) => dayjs.unix(Number(date));

export const DayUnixFormat = (
	date: number,
	format: string,
	lang: string = "en",
) => {
	const time = dayjs.unix(Number(date));

	const dateP = dayjs(time, { jalali: true });

	console.log(dateP);
	console.log(
		dayjs(time).calendar("jalali").locale("en").format("DD MMMM YYYY"),
	);
	console.log(
		dayjs(time).calendar("gregory").locale("fa").format("DD MMMM YYYY"),
	);

	return lang == "en"
		? dayjs(time).calendar("gregory").locale("fa").format(format)
		: dayjs(time).calendar("jalali").locale("en").format(format);
};

export const DayUnixFormatNow = (format: string) =>
	dayjs(dayjs.unix(Number(currentUnixTimestamp))).format(format);

export const DayUnixDiff = (date: number, format: dayjs.QUnitType) =>
	dayjs.unix(Number(date)).diff(dayjs.unix(currentUnixTimestampZero), format);

export const DayToday = (date: number) =>
	+date >= currentUnixTimestampZero && +date < TomorrowUnixTimestampZero;

export const DayUnixDuration = (dateStart: string, dateEnd: string) =>
	dayjs.duration(
		dayjs.unix(Number(dateStart)).diff(dayjs.unix(Number(dateEnd))),
	);

export const DayUnixDurationDiff = (dateStart: string, dateEnd: string) =>
	dayjs.duration(
		dayjs.unix(Number(dateStart)).diff(dayjs.unix(Number(dateEnd))),
	);

export const DayUnixAdd = (
	dateStart: number,
	dateEnd: ManipulateType,
	addIndex: number,
) => dayjs(dayjs.unix(dateStart).add(addIndex, dateEnd)).unix();

export const TomorrowUnixTimestampZero = DayUnixAdd(
	currentUnixTimestampZero,
	"day",
	1,
);
