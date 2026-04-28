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
import PeopleInfo from "../People/PeopleInfo/PeopleInfo.component";

export function DrawerInfos({
  drawerType,
}: {
  drawerType: string;
  className?: React.ComponentProps<"form">;
}) {
  switch (drawerType) {
    case "TodoList":
      return <TodoInfo />;
    case "SpendsList":
      return <SpendsInfo />;
    case "HabbitList":
      return <HabbitInfo />;
    case "GoalsList":
      return <GoalsInfo />;
    case "VisitsList":
      return <VisitsInfo />;
    case "InstallmentsList":
      return <InstallmentsInfo />;
    case "ReminderList":
      return <RemindersInfo />;
    case "TimerList":
      return <TimerInfo />;
    case "PeopleList":
      return <PeopleInfo />;
    case "BootomList":
      return <ListMenuButtons />;
    case "MenuList":
      return <MenuMainSideBarComponent />;
    case "FilterList":
      return <FilterComponent witDate />;
    default:
      return (
        <div className="grid gap-3">
          <Label htmlFor="username">SOmThing Went Wrong</Label>
        </div>
      );
  }
}
