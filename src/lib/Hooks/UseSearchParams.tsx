"use client";
import { useSearchParams } from "next/navigation";

function UseSearchParams() {
  const searchParams = useSearchParams();

  const dateFrom = searchParams.get("dateFrom");
  const hasdateFrom = searchParams.has("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const hasdateTo = searchParams.has("dateTo");
  const categorySearch = searchParams.get("category");
  const hasCategorySearch = searchParams.has("category");
  const tagSearch = searchParams.get("tag");
  const hasTagSearch = searchParams.has("tag");
  return {
    dateFrom,
    hasdateFrom,
    dateTo,
    hasdateTo,
    categorySearch,
    hasCategorySearch,
    hasTagSearch,
    tagSearch,
  };
}

export default UseSearchParams;
