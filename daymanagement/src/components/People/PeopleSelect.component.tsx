"use client";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit } from "../icons";
import { useAppSelector } from "../../lib/hook";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { SelectButtonGroup } from "../ui/SelectButtonGroup";

interface ICategotySelect {
  className?: string;
  required?: boolean;
  errors?: boolean;
  onValueChange: (category: string) => void;
  value?: string;
  description?: string;
}

function PeopleSelectComponent({
  required = false,
  errors = false,
  onValueChange,
  value,
  description,
}: ICategotySelect) {
  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.Friends) || {};

  return (
    <SelectButtonGroup
      title="PeopleList"
      name="people"
      errors={errors}
      placeholder="Choose Your Friend"
      required={required}
      itemArray={ListPeople}
      onValueChange={(e) => e && onValueChange(e)}
      value={value || ""}
      description={description}
      className={`${description ? "border-[1px] border-red-600" : ""}`}
    >
      <DrawerDialogDemo
        drawerType="Friends"
        formType="Add"
        drawerTitle="Friend"
      >
        <DialogTrigger asChild>
          <div className="text-red-400 w-8 h-8 flex justify-center items-center rounded-r-xl border border-border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <Edit />
          </div>
        </DialogTrigger>
      </DrawerDialogDemo>
    </SelectButtonGroup>
  );
}

export default PeopleSelectComponent;
