"use client"
import { useAppSelector } from "@/lib/hook";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UseMyHabbitList() {

  const { ListMyHaBBIT }: {
    ListMyHaBBIT: Thabbit[];
  } = useAppSelector((state) => state.MYhabbitList) || [];

  const searchParams = useSearchParams()

  const categorySearch = searchParams.get("category")
  const hasCategorySearch = searchParams.has("category")
  const tagSearch = searchParams.get("tag")
  const hasTagSearch = searchParams.has("tag")
 

  const [listAfterFilter, setListAfterFilter] = useState< Thabbit[] | undefined>(ListMyHaBBIT)

  useEffect(() => {
  const filterdList = () => {
    let filterArrayCat= ListMyHaBBIT
    if (hasCategorySearch ) {
      filterArrayCat =  ListMyHaBBIT.length > 0 ? ListMyHaBBIT.filter((list) => list.category == categorySearch ) : []
    }

    let filterArrayTag= filterArrayCat
    if (hasTagSearch ) {
      filterArrayTag =  filterArrayCat.length > 0 ? filterArrayCat.filter((list) => list.tag == tagSearch ) : []
    }
    console.log(ListMyHaBBIT);
    console.log(filterArrayCat);
    console.log(filterArrayTag);
  
    return filterArrayTag
    } 
  const list = filterdList() 

    list ? setListAfterFilter(list) : setListAfterFilter([])
    console.log(list)
  }, [ListMyHaBBIT, tagSearch, categorySearch])
  
   
  return listAfterFilter
}

export default UseMyHabbitList;
