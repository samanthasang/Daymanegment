"use client";
import { Ballot, Calender, EventAvailable } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { cn } from "../utils";
import useFilters from "./useFilters";
import useMediaQueryValues from "./useMediaQuery";

function UseResetFilterComponent() {
  const { applyFilter } = useFilters();

  const { isMDMax } = useMediaQueryValues();

  const searchParams = useSearchParams();

  const hasdateTo = searchParams.has("dateTo");
  const hasCategory = searchParams.has("category");
  const hasTag = searchParams.has("tag");

  const handleCatFilter = () => {
    applyFilter("category", "");
  };
  const handleTagFilter = () => {
    applyFilter("tag", "");
  };
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
          hasdateTo && handleDateFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          hasdateTo ? "bg-button" : "bg-primary"
        )}
      >
        <Calender />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasCategory && handleCatFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          hasCategory ? "bg-button" : "bg-primary"
        )}
      >
        <Ballot className="fill-red-500" />
      </div>
      <div
        onClick={(e) => {
          e && e.preventDefault();
          hasTag && handleTagFilter();
        }}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          hasTag ? "bg-button" : "bg-primary"
        )}
      >
        <EventAvailable className="fill-red-500" />
      </div>
    </div>
  );
}
export default UseResetFilterComponent;
