"use client";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { usePathname, useSearchParams } from "next/navigation";
import useFilters from "./useFilters";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function UseResetFilterComponent() {
  const { applyFilter } = useFilters();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasdateFrom = searchParams.has("dateFrom");
  const hasCategorySearch = searchParams.has("category");
  const hasTagSearch = searchParams.has("tag");

  const handleResetFilter = () => {
    console.log("applyFilter");

    // applyFilter("dateFrom", "");
    // applyFilter("dateTo", "");
    // applyFilter("category", "");
    // applyFilter("tag", "");
    return window.history.pushState(null, "", pathname);
  };

  return (
    <Button
      //   disabled={!hasdateFrom || !hasCategorySearch || !hasTagSearch}
      onClick={() => handleResetFilter()}
    >
      Reset
    </Button>
  );
}
export default UseResetFilterComponent;
