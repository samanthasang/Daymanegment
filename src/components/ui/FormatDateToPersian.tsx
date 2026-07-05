import dayjs from "dayjs";

export const formatDate = (date: Date | undefined, lang: string): string => {
	if (!date) return "";

	if (lang === "fa") {
		// Simple Jalali conversion (approximate)
		const d = dayjs(date);
		const persianMonths = [
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

		const gregorianYear = d.year();
		const gregorianMonth = d.month();
		const gregorianDay = d.date();

		// Approximate Jalali date (for accurate conversion, use a proper library)
		const persianYear = gregorianYear - 621;
		const persianMonth = persianMonths[gregorianMonth];
		const persianDay = gregorianDay;

		return `${persianDay} ${persianMonth} ${persianYear}`;
	}

	// English format
	return dayjs(date).format("MM/DD/YYYY");
};
