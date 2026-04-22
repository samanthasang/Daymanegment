"use client";
import { useMemo } from "react";
import UseSearchParams from "../UseSearchParams";

function TagFilter(List: any[]) {
  const { tagSearch, hasTagSearch } = UseSearchParams();

  const tagArray = useMemo(
    () =>
      hasTagSearch && !!tagSearch
        ? List?.filter((a) => a.tag == tagSearch)
        : List,
    [List, hasTagSearch, tagSearch]
  );

  return tagArray;
}

export default TagFilter;
