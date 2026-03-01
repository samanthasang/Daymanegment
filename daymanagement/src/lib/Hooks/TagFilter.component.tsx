"use client";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/icons";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFilters from "./useFilters";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function UseTagFilterComponent() {
  const { applyFilter } = useFilters();

  const searchParams = useSearchParams();
  const tagSearch = searchParams.get("tag");
  const hasTagSearch = searchParams.has("tag");

  const [tag, setTag] = useState<string | undefined>("");

  useEffect(() => {
    tag && console.log(tag);

    tag ? applyFilter("tag", tag) : applyFilter("tag", false);
  }, [tag]);

  useEffect(() => {
    hasTagSearch && console.log(tagSearch);

    hasTagSearch
      ? tagSearch && tag != tagSearch && setTag(tagSearch)
      : setTag("");
  }, [hasTagSearch]);

  const handleTagSelect = (tag: string) => {
    setTag(tag);
  };

  return <TagSelectComponent onValueChange={handleTagSelect} value={tag} />;
}
export default UseTagFilterComponent;
