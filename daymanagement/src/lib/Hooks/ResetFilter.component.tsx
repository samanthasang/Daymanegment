"use client";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { usePathname, useSearchParams } from "next/navigation";
import useFilters from "./useFilters";
import {
  AltTask,
  Ballot,
  Calender,
  ChevronSmallDoubleUp,
  ChevronSmallTripleUp,
  ChevronSmallUp,
  EventAvailable,
  Trash,
} from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function UseResetFilterComponent() {
  const { applyFilter } = useFilters();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasdateFrom = searchParams.has("dateFrom");
  const hasdateTo = searchParams.has("dateTo");
  const hasCategorySearch = searchParams.has("category");
  const hasTagSearch = searchParams.has("tag");

  const handleResetFilter = () => {
    console.log("applyFilter");
    return window.history.pushState(null, "", pathname);
  };
  const handleCatFilter = () => {
    console.log("applyFilter category");
    applyFilter("category", "");
  };
  const handleTagFilter = () => {
    console.log("applyFilter tag");
    applyFilter("tag", "");
  };
  const handleDateFilter = () => {
    console.log("applyFilter date");
    applyFilter("dateFrom", "");
    applyFilter("dateTo", "");
  };

  return (
    <div className="flex justify-around w-full mx-auto h-10 px-1 absolute bottom-0 left-0 right-0">
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasdateTo && handleDateFilter();
        }}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <Calender />
        <BasicSwitch
          checked={hasdateTo}
          handleToggle={(e) => {
            e && e.preventDefault();
            hasdateTo && handleDateFilter();
          }}
          label=""
          key={"isComplete"}
        />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasCategorySearch && handleCatFilter();
        }}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <Ballot className="fill-red-500" />
        <BasicSwitch
          checked={hasCategorySearch}
          handleToggle={(e) => {
            e && e.preventDefault();
            hasCategorySearch && handleCatFilter();
          }}
          label=""
          key={"isComplete"}
        />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasTagSearch && handleTagFilter();
        }}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <EventAvailable className="fill-red-500" />
        <BasicSwitch
          checked={hasTagSearch}
          handleToggle={(e) => {
            e && e.preventDefault();
            hasTagSearch && handleTagFilter();
          }}
          label=""
          key={"isComplete"}
        />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasdateTo && hasCategorySearch && hasTagSearch && handleResetFilter();
        }}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <AltTask className="fill-red-500" />
      </div>
    </div>
  );
}
export default UseResetFilterComponent;
