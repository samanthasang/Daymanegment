"use client";

import { InputField } from "@/components/ui/inputField";
import { Suspense, useEffect, useState } from "react";
import ListContent from "./ListContainer/ListContent.component";
import ListDetails from "./ListDetails.component";
import UseResetFilterComponent from "@/lib/Hooks/ResetFilter.component";

function CurrentListSearch({
  List,
  drawerType,
}: {
  List: [];
  drawerType: string;
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    title != "" && List.filter((li: any) => li.title.includes(title));
  }, [title]);
 
  return (
    <>
      <div className="flex justify-center items-center gap-x-1">
        <InputField
          title="Title"
          type="string"
          placeholder="Search . . ."
          className="flex-1"
          onChange={(e) => e && setTitle(e.target.value)}
        />
        <UseResetFilterComponent />
      </div>
      <ListContent ListCount={List.length}>
        <Suspense>
          <ListDetails
            List={
              title.trim() != ""
                ? (List.filter((li: any) =>
                    li.title.toLowerCase().includes(title.trim().toLowerCase())
                  ) as [])
                : List
            }
            drawerType={drawerType}
          />
        </Suspense>
      </ListContent>
    </>
  );
}

export default CurrentListSearch;
