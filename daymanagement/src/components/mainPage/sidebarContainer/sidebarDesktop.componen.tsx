import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import FilterComponent from "../../Filter/FilterComponent";
import { Button } from "../../ui/button";

function SidebarDesktop({
  drawerType,
  formType,
  witDate = true,
  witAdd = true,
}: {
  drawerType: string;
  formType: string;
  witDate: boolean;
  witAdd?: boolean;
}) {
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="h-full">
        <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
          <FilterComponent witDate={witDate} />

          {witAdd && (
            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={drawerType} formType={formType}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <span>add</span>
                  </Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarDesktop;
