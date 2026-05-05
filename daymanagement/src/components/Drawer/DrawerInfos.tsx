"use client";
import { Label } from "@/components/ui/label";
import FilterComponent from "../Filter/FilterComponent";
import ListMenuButtons from "../mainPage/ListSection/ListMenu/ListMenuButtons.component";
import MenuMainSideBarComponent from "../mainPage/Page/MenuSideBar/MainMenuSideBar.component";
import TodoInfo from "../Todo/TodoInfo/TodoInfo.component";
import SpendsInfo from "../Spends/SpendsInfo/SpendsInfo.component";
import HabbitInfo from "../Habbit/HabbitInfo/HabbitInfo.component";
import GoalsInfo from "../Goals/GoalsInfo/GoalsInfo.component";
import VisitsInfo from "../Visits/VisitsInfo/VisitsInfo.component";
import InstallmentsInfo from "../Installments/InstallmentsInfo/InstallmentsInfo.component";
import RemindersInfo from "../Reminder/RemindersInfo/InstallmentsInfo.component";
import TimerInfo from "../Timer/TimerInfo/TimerInfo.component";
import FriendsInfo from "../Friends/FriendsInfo/FriendsInfo.component";
import ShareInfo from "../Share/ShareInfo/ShareInfo.component";

export function DrawerInfos({
  drawerType,
}: {
  drawerType: string;
  className?: React.ComponentProps<"form">;
}) {
  switch (drawerType) {
    case "Todos":
      return <TodoInfo />;
    case "Spends":
      return <SpendsInfo />;
    case "Habbits":
      return <HabbitInfo />;
    case "Goals":
      return <GoalsInfo />;
    case "Visits":
      return <VisitsInfo />;
    case "Installments":
      return <InstallmentsInfo />;
    case "Reminders":
      return <RemindersInfo />;
    case "Timers":
      return <TimerInfo />;
    case "Friends":
      return <FriendsInfo />;
    case "Shares":
      return <ShareInfo />;
    case "BootomsList":
      return <ListMenuButtons />;
    case "MenuList":
      return <MenuMainSideBarComponent />;
    case "FilterList":
      return <FilterComponent witDate />;
    default:
      return (
        <div className="grid gap-3">
          <Label htmlFor="username">SomThing Went Wrong</Label>
        </div>
      );
  }
}
