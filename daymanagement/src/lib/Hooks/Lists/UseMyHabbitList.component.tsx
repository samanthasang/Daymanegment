"use client"
import { useAppSelector } from "@/lib/hook";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { TMyHabbit } from "@/modules/myHabbitList/myHabbit.slice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UseMyHabbitList() {

  const { ListMyHabbit }: {
    ListMyHabbit: TMyHabbit[];
    selectedMyHabbit: {}
  } = useAppSelector((state) => state.MYhabbitList) || [];

  // const { ListMyHabbit }: {
  //   ListMyHabbit: TMyHabbit[];
  // } = useAppSelector((state) => state.MYhabbitList) || [];

  const searchParams = useSearchParams()

  const categorySearch = searchParams.get("category")
  const hasCategorySearch = searchParams.has("category")
  const tagSearch = searchParams.get("tag")
  const hasTagSearch = searchParams.has("tag")
 

  const [listAfterFilter, setListAfterFilter] = useState< Thabbit[] | undefined>(ListMyHabbit)

  useEffect(() => {
  const filterdList = () => {
    let filterArrayCat= ListMyHabbit
    if (hasCategorySearch ) {
      filterArrayCat =  ListMyHabbit.length > 0 ? ListMyHabbit.filter((list) => list.category == categorySearch ) : []
    }

    let filterArrayTag= filterArrayCat
    if (hasTagSearch ) {
      filterArrayTag =  filterArrayCat.length > 0 ? filterArrayCat.filter((list) => list.tag == tagSearch ) : []
    }
    console.log(ListMyHabbit);
    console.log(filterArrayCat);
    console.log(filterArrayTag);
  
    return filterArrayTag
    } 
  const list = filterdList() 

    list ? setListAfterFilter(list) : setListAfterFilter([])
    console.log(list)
  }, [ListMyHabbit, tagSearch, categorySearch])
  
   
  return listAfterFilter
}

export default UseMyHabbitList;
