import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Done, DoneAll, Edit, Trash } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { useAppDispatch } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { selectPeopleList } from "@/modules/people/PeopleList.slice";

export const ListItemActions = ({
  id,
  title,
  isComplete,
  nextDate,
  date,
  score,
  hasShare,
  drawerType,
  withDel = true,
  DelItem,
  CompleteItem,
  UpdateItem,
}: {
  id?: string;
  title: string;
  isComplete?: boolean;
  nextDate?: string;
  date?: string | number;
  score?: number;
  hasShare?: boolean;
  drawerType: string;
  withDel?: boolean;
  DelItem?: () => void;
  CompleteItem?: () => void;
  UpdateItem?: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row gap-x-2 items-center">
      {withDel && DelItem && (
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e &&
              !(hasShare || (score == 0 && score)) &&
              !isComplete &&
              DelItem();
          }}
          className="flex justify-center items-center h-10 w-10 min-w-10 flex-1 rounded-full bg-primary hover:bg-error cursor-pointer"
        >
          <Trash />
        </div>
      )}
      {drawerType == "PeopleList" && id && (
        <DrawerDialogDemo drawerType="PeopleList" formType={`Edit ${title}`}>
          <DialogTrigger asChild>
            <Button
              onClick={(e) => {
                e && e.stopPropagation();
                e && dispatch(selectPeopleList(id));
              }}
              variant="outline"
              className="flex justify-center items-center h-10 w-10 min-w-10 flex-1 rounded-full bg-primary hover:bg-button/15 cursor-pointer"
            >
              <Edit />
            </Button>
          </DialogTrigger>
        </DrawerDialogDemo>
      )}
      {drawerType != "SpendsList" && (
        <>
          {UpdateItem && (
            <div
              onClick={(e) => {
                e && e.preventDefault();
                e && e.stopPropagation();
                e && UpdateItem();
              }}
              className={cn(
                "h-10 w-10 min-w-10 flex justify-center items-center flex-1 rounded-full hover:bg-card/15 cursor-pointer",
                !isComplete
                  ? nextDate != date ||
                    !(
                      date &&
                      DayUnixFormat(+date, "YYYY-MM-DD") >
                        DayUnixFormatNow("YYYY-MM-DD")
                    )
                    ? "bg-success"
                    : "bg-primary"
                  : "bg-success"
              )}
            >
              <DoneAll />
            </div>
          )}
          {CompleteItem && (
            <div
              onClick={(e) => {
                e && e.preventDefault();
                e && e.stopPropagation();
                e && !isComplete && CompleteItem();
              }}
              className={cn(
                "h-10 w-10 min-w-10 flex justify-center items-center flex-1 rounded-full hover:bg-card/15 cursor-pointer",
                isComplete ? "bg-success" : "bg-primary"
              )}
            >
              <Done />
            </div>
          )}
        </>
        // : (
        //   CompleteItem && (
        //     <BasicSwitch
        //       checked={isComplete || false}
        //       handleToggle={(e) => {
        //         e && e.preventDefault();
        //         e && e.stopPropagation();
        //         e && !isComplete && CompleteItem();
        //       }}
        //       label=""
        //       key={"isComplete"}
        //     />
        //     // <SwitchComponent
        //     //   ChangeStatus={CompleteItem}
        //     //   checkStatus={isComplete}
        //     //   className="h-8 w-8 min-w-8"
        //     // >
        //     //   <Done />
        //     // </SwitchComponent>
        //   )
        // )
      )}
    </div>
  );
};

export default ListItemActions;
