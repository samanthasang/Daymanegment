"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Thabit, updateHabitList } from "@/modules/habbitList/habbit.slice";
import { ManipulateType } from "dayjs";
import { useEffect } from "react";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import TagFilter from "../../Filters/TagFilter.componen";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import {
	currentUnixTimestampZero,
	DayUnixAdd,
	DayUnixDiff,
	TomorrowUnixTimestampZero,
} from "../../UseDayJS";

function UseHabbitList() {
	const dispatch = useAppDispatch();
	const Habit = useAppSelector((state) => state.Habits);

	const selectedHabbit = Habit?.selectedhabit as Thabit;
	const ListHabbit = Habit?.ListHabit as Thabit[];

	const categoryArray = CategoryFilter([...ListHabbit] as any);

	const listAfterFilter = TagFilter([...categoryArray] as any);

	const ListMyHabbit = listAfterFilter.filter((a) => a.score > 9);
	const ListHabbitNew = ListHabbit.filter((a) => a.score <= 9);

	const oldCategoryArray = CategoryFilter([...ListHabbitNew] as any);

	const oldListAfterFilter = TagFilter([...oldCategoryArray] as any);

	const dateUpOrderArray: Thabit[] = DatePlusOrderFilter(ListMyHabbit);
	const dateDOwnOrderArray: Thabit[] = DateMinusOrderFilter(oldListAfterFilter);

	useEffect(() => {
		ListHabbit.map((item) =>
			item.isPause
				? dispatch(
						updateHabitList({
							...item,
						}),
					)
				: (DayUnixDiff(item.doDate, "day") < -1 &&
						dispatch(
							updateHabitList({
								...item,
								doDate: DayUnixAdd(
									+item.doDate,
									"day" as ManipulateType,
									item.everyDay ? 1 : +(item.customDays ?? 1),
								),
								score: item.score + 1 + DayUnixDiff(item.doDate, "day"),
								isComplete: false,
							}),
						)) ||
					(DayUnixDiff(item.doDate, "day") == 0 &&
						dispatch(
							updateHabitList({
								...item,
								doDate: DayUnixAdd(
									+item.doDate,
									"day" as ManipulateType,
									item.everyDay ? 1 : +(item.customDays ?? 1),
								),
								isComplete: false,
							}),
						)),
		);
	}, []);

	const ListHabbitToday = ListHabbit.filter(
		(a) =>
			+a.doDate >= currentUnixTimestampZero &&
			+a.doDate < TomorrowUnixTimestampZero,
	);
	return {
		ListMyHabbit: dateUpOrderArray,
		ListHabbitAll: ListHabbit,
		ListHabbitNew: dateDOwnOrderArray,
		selectedHabbit,
		ListHabbitToday,
	};
}

export default UseHabbitList;
