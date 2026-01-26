"use client"
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import { Button } from "../../ui/button";
import FilterComponent from "@/components/Filter/Todo.component";
import useInstallmentsList from "@/lib/Hooks/Lists/UseInstallmentsList.component";

function InstallmentsSideBar() {

  const ListInstallments = useInstallmentsList()
   
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={'InstallmentsList'} formType="Add Installments" >
                <DialogTrigger asChild>
                  <Button variant="outline"><span>add</span></Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>

          </div>
        </div>
        
        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {/* {"Installmentss : " + `${ListInstallments?.filter((spends) => spends. == true).length} / ${ListInstallments?.filter((spends) => spends.income != true).length}`} */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InstallmentsSideBar;
