import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import {
  AddTask,
  AltTask,
  ChevronSmallTripleUp,
  Done,
  DoneAll,
} from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setTimerList } from "@/modules/timerList/timer.slice";

function ListMenuBottom({
  listTitle,
  priorityFilter,
  dateFIlter,
  complateFIlter,
  ChangePriority,
  ChangeDate,
  ChangeComplate,
  ListInfo,
  selectedID,
  drawerType,
  formType,
  withpriority,
  withdate,
  withcomplate,
}: {
  selectedID: boolean;
  withpriority?: boolean;
  withdate?: boolean;
  withcomplate?: boolean;
  priorityFilter?: boolean;
  dateFIlter?: boolean;
  complateFIlter?: boolean;
  ChangePriority?: () => void;
  ChangeComplate?: () => void;
  ChangeDate?: () => void;
  listTitle: string;
  ListInfo: string;
  drawerType: string;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { OpenFilter } = useAppSelector((state) => state.Menu);

  const StartTimer = () => {
    dispatch(
      setTimerList({
        id: "",
        title: `timer-${Math.floor(new Date().getTime() / 1000).toString()}`,
        startDate: Math.floor(new Date().getTime() / 1000).toString(),
        endDate: Math.floor(new Date().getTime() / 1000).toString(),
        isComplete: false,
        category: "",
        tag: "",
      })
    );
  };
  return (
    <div className="flex justify-around items-center gap-x-1 w-full mx-auto h-10 px-1 absolute bottom-0 left-0 right-0 m-1">
      <div className="flex justify-between items-center w-full mx-auto h-9 p-[6px] bg-slate-800 rounded-3xl px-3">
        <span>{listTitle}</span>
        <span>{ListInfo}</span>
      </div>
      {(!OpenFilter || !selectedID) && (
        <>
          {withdate && (
            <div
              onClick={(e) => {
                e && e.preventDefault();
                ChangeDate && ChangeDate();
              }}
              className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
            >
              <DoneAll />
              <BasicSwitch
                checked={dateFIlter || false}
                handleToggle={(e) => {
                  e && e.preventDefault();
                  ChangeDate && ChangeDate();
                }}
                label=""
                key={"isComplete"}
              />
            </div>
          )}
          {withcomplate && (
            <div
              onClick={(e) => {
                e && e.preventDefault();
                ChangeComplate && ChangeComplate();
              }}
              className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
            >
              <Done />
              <BasicSwitch
                checked={complateFIlter || false}
                handleToggle={(e) => {
                  e && e.preventDefault();
                  ChangeComplate && ChangeComplate();
                }}
                label=""
                key={"isComplete"}
              />
            </div>
          )}
          {withpriority && (
            <div
              onClick={(e) => {
                e && e.preventDefault();
                ChangePriority && ChangePriority();
              }}
              className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
            >
              <ChevronSmallTripleUp className="fill-red-500" />
              <BasicSwitch
                checked={priorityFilter || false}
                handleToggle={(e) => {
                  e && e.preventDefault();
                  ChangePriority && ChangePriority();
                }}
                label=""
                key={"isComplete"}
              />
            </div>
          )}
          {drawerType == "PeopleList" && (
            <DrawerDialogDemo drawerType="ShareList" formType="Add Share">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    "h-9 bg-transparent border-none flex-1 rounded-3xl hover:bg-slate-800 w-full cursor-pointer"
                  }
                >
                  <AddTask />
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
          )}
          {drawerType != "TimerList" && (
            <DrawerDialogDemo drawerType={drawerType} formType={formType}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    "h-9 bg-transparent border-none flex-1 rounded-3xl hover:bg-slate-800 w-full cursor-pointer"
                  }
                >
                  <AltTask />
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
          )}
          {drawerType == "TimerList" && (
            <Button
              variant="outline"
              onClick={() => StartTimer()}
              className={
                "h-9 bg-transparent border-none flex-1 rounded-3xl hover:bg-slate-800 w-full cursor-pointer"
              }
            >
              <AltTask />
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default ListMenuBottom;
