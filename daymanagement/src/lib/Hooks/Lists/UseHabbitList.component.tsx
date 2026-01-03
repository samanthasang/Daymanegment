"use client"
import { useAppSelector } from "@/lib/hook";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UseHabbitList() {

  const { ListHabbit }: {
    ListHabbit: Thabbit[];
  } = useAppSelector((state) => state.habbitList) || [];

  const searchParams = useSearchParams()

  const categorySearch = searchParams.get("category")
  const hasCategorySearch = searchParams.has("category")
  const tagSearch = searchParams.get("tag")
  const hasTagSearch = searchParams.has("tag")
 

  const [listAfterFilter, setListAfterFilter] = useState< Thabbit[] | undefined>(ListHabbit)

  useEffect(() => {
  const filterdList = () => {
    let filterArrayCat= ListHabbit
    if (hasCategorySearch ) {
      filterArrayCat =  ListHabbit.length > 0 ? ListHabbit.filter((list) => list.category == categorySearch ) : []
    }

    let filterArrayTag= filterArrayCat
    if (hasTagSearch ) {
      filterArrayTag =  filterArrayCat.length > 0 ? filterArrayCat.filter((list) => list.tag == tagSearch ) : []
    }
    console.log(ListHabbit);
    console.log(filterArrayCat);
    console.log(filterArrayTag);
  
    return filterArrayTag
    } 
  const list = filterdList() 

    list ? setListAfterFilter(list) : setListAfterFilter([])
    console.log(list)
  }, [ListHabbit, tagSearch, categorySearch])
  
   
  return listAfterFilter
}

export default UseHabbitList;
