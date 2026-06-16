"use client";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { useEffect, useState } from "react";
import useFilters from "./useFilters";
import UseSearchParams from "./UseSearchParams";

function UseTagFilterComponent() {
  const { applyFilter } = useFilters();

  const { tagSearch, hasTagSearch } = UseSearchParams();
  const [tag, setTag] = useState<string | undefined>("");

  useEffect(() => {
    tag ? applyFilter("tag", tag) : applyFilter("tag", false);
  }, [tag]);

  useEffect(() => {
    hasTagSearch
      ? tagSearch && tag != tagSearch && setTag(tagSearch)
      : setTag("");
  }, [hasTagSearch, tagSearch]);

  const handleTagSelect = (tag: string) => {
    setTag(tag);
  };

  return <TagSelectComponent onValueChange={handleTagSelect} value={tag} />;
}
export default UseTagFilterComponent;
