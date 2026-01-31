"use client";
import { useAppSelector } from "@/lib/hook";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function useInstallmentsList() {
  const {
    ListInstallmentst,
  }: {
    ListInstallmentst: TInstallmentsts[];
    selectedInstallmentst: {};
  } = useAppSelector((state) => state.InstallmentstList) || [];

  const searchParams = useSearchParams();

  const dateFrom = searchParams.get("dateFrom");
  const hasdateFrom = searchParams.has("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const hasdateTo = searchParams.has("dateTo");
  const categorySearch = searchParams.get("category");
  const hasCategorySearch = searchParams.has("category");
  const tagSearch = searchParams.get("tag");
  const hasTagSearch = searchParams.has("tag");
  const fromTodayNow = new Date().setHours(0, 0, 0, 0);

  const [listAfterFilter, setListAfterFilter] = useState<
    TInstallmentsts[] | undefined
  >(ListInstallmentst);

  useEffect(() => {
    const filterdList = () => {
      const fromDay = hasdateFrom
        ? dateFrom
        : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString();
      const toDay = hasdateTo
        ? dateTo
        : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString();
      let filterArrayDay = ListInstallmentst || [];
      if (hasdateTo && hasdateFrom && fromDay) {
        if (toDay) {
          filterArrayDay = ListInstallmentst.filter(
            (list) => list.lastUpdate >= fromDay && list.lastUpdate <= toDay
          );
        }
      }
      if (fromDay && toDay && fromDay == toDay) {
        filterArrayDay = ListInstallmentst.filter(
          (list) => list.lastUpdate >= fromDay && list.lastUpdate <= toDay
        );
      }
      if (fromDay && toDay && fromDay != toDay) {
        filterArrayDay = ListInstallmentst.filter(
          (list) =>
            Math.floor(+list.lastUpdate).toString() >= fromDay &&
            Math.floor(+list.lastUpdate).toString() <= toDay
        );
      }

      let filterArrayCat = filterArrayDay;
      if (hasCategorySearch) {
        filterArrayCat =
          filterArrayDay.length > 0
            ? filterArrayDay.filter((list) => list.category == categorySearch)
            : [];
      }

      let filterArrayTag = filterArrayCat;
      if (hasTagSearch) {
        filterArrayTag =
          filterArrayCat.length > 0
            ? filterArrayCat.filter((list) => list.tag == tagSearch)
            : [];
      }
      console.log(ListInstallmentst);
      console.log(filterArrayDay);
      console.log(filterArrayCat);
      console.log(filterArrayTag);

      return filterArrayTag;
    };
    const list = filterdList();

    list ? setListAfterFilter(list) : setListAfterFilter([]);
    console.log(list);
  }, [ListInstallmentst, dateFrom, dateTo, tagSearch, categorySearch]);

  return listAfterFilter;
}

export default useInstallmentsList;
