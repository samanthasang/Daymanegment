"use client";
import { CalendarOff, Folder, Tag } from "lucide-react";
import { cn } from "../utils";
import { DayUnixDiff } from "./UseDayJS";
import useFilters from "./useFilters";
import useMediaQueryValues from "./useMediaQuery";
import UseSearchParams from "./UseSearchParams";

function UseResetFilterComponent() {
  const { applyFilter } = useFilters();

  const { isMDMax } = useMediaQueryValues();

  const { hasdateFrom, dateFrom, hasdateTo, hasCategorySearch, hasTagSearch } =
    UseSearchParams();

  const handleCatFilter = () => {
    applyFilter("category", "");
  };
  const handleTagFilter = () => {
    applyFilter("tag", "");
  };
  const fromTodayNow = new Date().setHours(0, 0, 0, 0);

  const toDaUnix = Math.floor(
    new Date(fromTodayNow).getTime() / 1000.0
  ).toString();
  const handleDateFilter = () => {
    applyFilter("dateFrom", "");
    applyFilter("dateTo", "");
  };

  return (
    <div
      className={cn(
        "flex justify-around w-full mx-auto p-1 bottom-0 left-0 right-0 gap-x-1",
        isMDMax ? "relative" : "absolute"
      )}
    >
      <div
        onClick={(e) => {
          e && e.preventDefault();
          ((hasdateFrom && dateFrom && DayUnixDiff(+dateFrom, "day") != 0) ||
            hasdateTo) &&
            handleDateFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",

          (dateFrom && DayUnixDiff(+dateFrom, "day") != 0) || hasdateTo
            ? "bg-button"
            : "bg-primary"
        )}
      >
        <CalendarOff
          className={
            (dateFrom && DayUnixDiff(+dateFrom, "day") != 0) || hasdateTo
              ? "fill-red-500"
              : "bg-transparent"
          }
        />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasCategorySearch && handleCatFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          hasCategorySearch ? "bg-button" : "bg-primary"
        )}
      >
        <Folder
          className={hasCategorySearch ? "fill-red-500" : "bg-transparent"}
        />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasTagSearch && handleTagFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          hasTagSearch ? "bg-button" : "bg-primary"
        )}
      >
        <Tag className={hasTagSearch ? "fill-red-500" : "bg-transparent"} />
      </div>
    </div>
  );
}
export default UseResetFilterComponent;
