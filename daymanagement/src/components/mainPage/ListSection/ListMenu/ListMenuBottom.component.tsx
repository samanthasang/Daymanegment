import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { More } from "@/components/icons";
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
import {
  Activity,
  FilePlus,
  ListPlus,
  Menu,
  Option,
  Settings,
  TimerIcon,
} from "lucide-react";
import { useState } from "react";
import MenuFilter from "../../Page/MenuSideBar/MenuFilter.component";
import MenuToday from "../../Page/MenuSideBar/MenuToday.component";
import ListMenuButtons from "./ListMenuButtons.component";
import TimerListMenuBottom from "./TimerListMenuBottom.component";
import { DrawerInfos } from "@/components/Drawer/DrawerInfos";

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
  withFinish,
  withComplateSort,
}: {
  withpriority?: boolean;
  withShop?: boolean;
  withBalance?: boolean;
  shopFilter?: boolean;
  balanceFilter?: boolean;
  ChangeShop?: () => void;
  ChangeBalance?: () => void;
  withFinish?: boolean;
  withComplateSort?: boolean;
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
        <DrawerButton
          drawerType="MenuList"
          formType={"Info"}
          className="flex-1"
        >
          <Menu />
        </DrawerButton>
      )}
      {isSMMax && <MenuFilter />}
      {isSMMax && <MenuToday />}
      {!isMDMax && (
        <div className="w-full mx-auto h-10 ">
          <DrawerButton
            drawerType={drawerType}
            formType="Info"
            className="w-full"
          >
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
            <Button variant="default" className="flex-1">
              <Settings />
            </Button>
          </DialogTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Custom</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-y-3 p-2">
              <DrawerInfos drawerType={drawerType} />

              <div className="flex flex-row gap-x-1">
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
                  withComplateSort={withComplateSort}
                  withFinish={withFinish}
                  withpriority={withpriority}
                  withShop={withShop}
                  withBalance={withBalance}
                />
              </div>
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
          withComplateSort={withComplateSort}
          withFinish={withFinish}
          withpriority={withpriority}
          withShop={withShop}
          withBalance={withBalance}
        />
      )}
      {drawerType != "TimerList" ? (
        <DrawerButton
          drawerType={drawerType}
          formType={formType}
          className="flex-1"
        >
          <FilePlus />
        </DrawerButton>
      ) : (
        <TimerListMenuBottom />
      )}
    </div>
  );
}

export default ListMenuBottom;
