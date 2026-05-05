"use client";
import { TCategory } from "@/modules/category/categoryList.slice";
import { LucideEdit } from "lucide-react";
import { useAppSelector } from "../../lib/hook";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { DialogTrigger } from "../ui/dialog";
import { SelectButtonGroup } from "../ui/SelectButtonGroup";
import { cn } from "@/lib/utils";

interface ICategotySelect {
  className?: string;
  required?: boolean;
  errors?: boolean;
  onValueChange: (data: string) => void;
  value?: string;
  description?: string;
}

function CategotySelectComponent({
  required,
  description,
  errors = false,
  onValueChange,
  value,
}: ICategotySelect) {
  const {
    ListCategory,
  }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];

  return (
    <SelectButtonGroup
      title="Category"
      name="category"
      errors={errors}
      placeholder="Choose Category"
      required={required}
      itemArray={ListCategory}
      onValueChange={(e) => e && onValueChange(e)}
      value={value || ""}
      className={cn(errors ? "border-[1px] border-red-600 w-full" : " w-full")}
    >
      <DrawerDialogDemo
        drawerType={"CategoryList"}
        formType="Add"
        drawerTitle="Category"
      >
        <DialogTrigger asChild>
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-r-xl border border-border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <LucideEdit width={16} height={16} />
          </div>
        </DialogTrigger>
      </DrawerDialogDemo>
    </SelectButtonGroup>
  );
}

export default CategotySelectComponent;
