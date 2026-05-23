"use client";
import { CalendarOff, Folder, Tag } from "lucide-react";
import { cn } from "../utils";
import { currentUnixTimestampZero, DayUnixDiff } from "./UseDayJS";
import useFilters from "./useFilters";
import UseSearchParams from "./UseSearchParams";
import { Button } from "@/components/ui/button";

function UseResetFilterComponent({
  fullButton = false,
}: {
  fullButton?: boolean;
}) {
  const { applyFilter } = useFilters();

  const { hasdateFrom, dateFrom, hasdateTo, hasCategorySearch, hasTagSearch } =
    UseSearchParams();

  const handleCatFilter = () => {
    applyFilter("category", "");
  };
  const handleTagFilter = () => {
    applyFilter("tag", "");
  };

  const handleDateFilter = () => {
    hasdateTo ? applyFilter("dateTo", "") : applyFilter("dateFrom", "");
  };

  return (
    <div
      className={cn(
        "w-full flex justify-around items-center gap-x-1",
        fullButton ? "w-full" : "w-fit"
      )}
    >
      <Button
        onClick={(e) => {
          e && e.preventDefault();
          ((hasdateFrom && dateFrom && DayUnixDiff(+dateFrom, "day") != 0) ||
            hasdateTo) &&
            handleDateFilter();
        }}
        className={cn(
          (dateFrom && DayUnixDiff(+dateFrom, "day") != 0) || hasdateTo
            ? "bg-button"
            : "bg-primary",
          fullButton && "flex-1"
        )}
      >
        <CalendarOff
          className={
            (dateFrom && DayUnixDiff(+dateFrom, "day") != 0) || hasdateTo
              ? "fill-red-500"
              : "bg-transparent"
          }
        />
      </Button>
      <Button
        onClick={(e) => {
          e && e.preventDefault();
          hasCategorySearch && handleCatFilter();
        }}
        className={cn(
          hasCategorySearch ? "bg-button" : "bg-primary",
          fullButton && "flex-1"
        )}
      >
        <Folder
          className={hasCategorySearch ? "fill-red-500" : "bg-transparent"}
        />
      </Button>
      <Button
        onClick={(e) => {
          e && e.preventDefault();
          hasTagSearch && handleTagFilter();
        }}
        className={cn(
          hasTagSearch ? "bg-button" : "bg-primary",
          fullButton && "flex-1"
        )}
      >
        <Tag className={hasTagSearch ? "fill-red-500" : "bg-transparent"} />
      </Button>
    </div>
  );
}
export default UseResetFilterComponent;
