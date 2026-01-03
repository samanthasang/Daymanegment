"use client"
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
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

function UseCategoryFilterComponent() {
    const { applyFilter } = useFilters();

    const searchParams = useSearchParams()
    const categorySearch = searchParams.get("category")
    const hasCategorySearch = searchParams.has("category")

    const [category, setCategory] = useState<string | undefined>("")

    useEffect(() => {
        category && console.log(category);

        category ? applyFilter("category", category) :
            applyFilter("category", false)
    }, [category])

    useEffect(() => {
        hasCategorySearch && console.log(categorySearch);

        categorySearch && category != categorySearch && setCategory(categorySearch)
    }, [hasCategorySearch])
    
    const handleCategorySelect = (category: string) => {
        setCategory(category)
    }

    return (
        <div className="flex flex-row">
            <CategotySelectComponent onClickChange={handleCategorySelect} value={category} />
            <DrawerDialogDemo drawerType={'CategoryList'} formType="category" >
            <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                  <Edit />
                </div> 
            </DialogTrigger>
            </DrawerDialogDemo>
        </div>
    )
}
export default UseCategoryFilterComponent;
