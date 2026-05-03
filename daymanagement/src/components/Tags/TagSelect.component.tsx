"use client";
import { TTag } from "@/modules/tag/TagList.slice";
import { LucideEdit } from "lucide-react";
import { useAppSelector } from "../../lib/hook";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { DialogTrigger } from "../ui/dialog";
import { SelectButtonGroup } from "../ui/SelectButtonGroup";

interface ICategotySelect {
  className?: string;
  required?: boolean;
  errors?: boolean;
  onValueChange: (category: string) => void;
  value?: string;
  description?: string;
}

function TagSelectComponent({
  required = false,
  errors = false,
  onValueChange,
  value,
  description,
}: ICategotySelect) {
  const {
    ListTag,
  }: {
    ListTag: TTag[];
    selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];

  return (
    <SelectButtonGroup
      title="Tag"
      name="tag"
      errors={errors}
      placeholder="Choose Tag"
      required={required}
      itemArray={ListTag}
      onValueChange={(e) => e && onValueChange(e)}
      value={value || ""}
      className={`${errors ? "border-[1px] border-red-600" : ""}`}
    >
      <DrawerDialogDemo drawerType={"TagList"} formType="Add">
        <DialogTrigger asChild>
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-r-xl border border-border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <LucideEdit width={16} height={16} />
          </div>
        </DialogTrigger>
      </DrawerDialogDemo>
    </SelectButtonGroup>
  );
}

export default TagSelectComponent;
