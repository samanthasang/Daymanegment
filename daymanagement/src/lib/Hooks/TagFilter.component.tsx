"use client"
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFilters from "./useFilters";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

function UseTagFilterComponent() {
    const { applyFilter } = useFilters();

    const searchParams = useSearchParams()
    const tagSearch = searchParams.get("tag")
    const hasTagSearch = searchParams.has("tag")

    const [tag, setTag] = useState<string | undefined>("")

    useEffect(() => {
        tag && console.log(tag);

        tag ? applyFilter("tag", tag) :
            applyFilter("tag", false)
    }, [tag])

    useEffect(() => {
        hasTagSearch && console.log(tagSearch);

        tagSearch && tag != tagSearch && setTag(tagSearch)
      
    }, [hasTagSearch])
    
    const handleTagSelect = (tag: string) => {
        setTag(tag)
    }

    return(
        <div className="flex flex-row">
        <TagSelectComponent onClickChange={handleTagSelect} value={tag} />
            <DrawerDialogDemo drawerType={'TagList'} formType="Add Tag">
            <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                  <Edit />
                </div> 
            </DialogTrigger>
            </DrawerDialogDemo>
        </div>

    )
}
export default UseTagFilterComponent;
