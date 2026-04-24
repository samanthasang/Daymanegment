import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { AddTask, More } from "@/components/icons";
import Earth from "@/components/icons/Earth";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import MenuFilter from "../../Page/MenuSideBar/MenuFilter.component";
import MenuToday from "../../Page/MenuSideBar/MenuToday.component";
import ListMenuButtons from "./ListMenuButtons.component";
import TimerListMenuBottom from "./TimerListMenuBottom.component";

function ListMenuBottom({
  listTitle,
  priorityFilter,
  withShop,
  withBalance,
  dateFIlter,
  complateFIlter,
  shopFilter,
  balanceFilter,
  ChangePriority,
  ChangeShop,
  ChangeBalance,
  ChangeDate,
  ChangeComplate,
  ListInfo,
  drawerType,
  formType,
  withpriority,
  withdate,
  withcomplate,
}: {
  withpriority?: boolean;
  withShop?: boolean;
  withBalance?: boolean;
  shopFilter?: boolean;
  balanceFilter?: boolean;
  ChangeShop?: () => void;
  ChangeBalance?: () => void;
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
  const [open, setOpen] = useState(false);
  const openDrawer = (e: boolean) => {
    setOpen(e);
  };

  const { isMDMax, isSMMax } = useMediaQueryValues();
  return (
    <div className="flex justify-around w-full mx-auto gap-x-0.5">
      {isSMMax && (
        <DrawerButton drawerType="MenuList" formType={"Info"}>
          <Earth />
        </DrawerButton>
      )}
      {isSMMax && <MenuFilter />}
      {isSMMax && <MenuToday />}
      {!isMDMax && (
        <div className="w-full mx-auto h-10 ">
          <DrawerButton drawerType={drawerType} formType="Info">
            <div className="flex justify-between items-center w-full mx-auto h-10 px-3 cursor-pointer">
              <span>{listTitle}</span>
              <span>{ListInfo}</span>
            </div>
          </DrawerButton>
        </div>
      )}
      {isSMMax ? (
        <Drawer open={open} onOpenChange={(e) => openDrawer(e)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={
                "flex justify-center items-center h-10 flex-1 rounded-full min-w-10 hover:bg-button/15 w-full cursor-pointer"
              }
            >
              <More />
            </Button>
          </DialogTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Custom</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-y-3">
              <ListMenuButtons
                ChangeComplate={ChangeComplate}
                ChangeDate={ChangeDate}
                ChangeShop={ChangeShop}
                ChangePriority={ChangePriority}
                ChangeBalance={ChangeBalance}
                complateFIlter={complateFIlter}
                dateFIlter={dateFIlter}
                priorityFilter={priorityFilter}
                shopFilter={shopFilter}
                balanceFilter={balanceFilter}
                withcomplate={withcomplate}
                withdate={withdate}
                withpriority={withpriority}
                withShop={withShop}
                withBalance={withBalance}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <ListMenuButtons
          ChangeComplate={ChangeComplate}
          ChangeDate={ChangeDate}
          ChangeShop={ChangeShop}
          ChangePriority={ChangePriority}
          ChangeBalance={ChangeBalance}
          complateFIlter={complateFIlter}
          dateFIlter={dateFIlter}
          priorityFilter={priorityFilter}
          shopFilter={shopFilter}
          balanceFilter={balanceFilter}
          withcomplate={withcomplate}
          withdate={withdate}
          withpriority={withpriority}
          withShop={withShop}
          withBalance={withBalance}
        />
      )}
      {drawerType == "PeopleList" && (
        <DrawerButton drawerType="ShareList" formType="Add Share">
          <AddTask />
        </DrawerButton>
      )}
      {drawerType != "TimerList" ? (
        <DrawerButton drawerType={drawerType} formType={formType}>
          <AddTask />
        </DrawerButton>
      ) : (
        <TimerListMenuBottom />
      )}
    </div>
  );
}

export default ListMenuBottom;
