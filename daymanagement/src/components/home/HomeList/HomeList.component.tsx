"use client";
import { cn } from "@/lib/utils";
import HomeTodoList from "../HomeItems/HomeTodoItem.component";
import HomeGoalsItem from "../HomeItems/HomeGoalsItem.component";
import HomeHabbitItem from "../HomeItems/HomeHabbitItem.component";
import HomeTimerItem from "../HomeItems/HomeTimerItem.component";
import HomeVisitItem from "../HomeItems/HomeVisitItem.component";
import HomeInstallmentsItem from "../HomeItems/HomeInstallmentsItem.component";
import HomeMyHabbitItem from "../HomeItems/HomeMyHabbitItem.component";
import HomeReminderItem from "../HomeItems/HomeReminderItem.component";
import HomeSpendsItem from "../HomeItems/HomeSpendsItem.component";
import HomeShareItem from "../HomeItems/HomeSharesItem.component copy";

function HomeList() {
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HomeTodoList />
        <HomeHabbitItem />
        <HomeGoalsItem />
        <HomeTimerItem />
        <HomeVisitItem />
        <HomeInstallmentsItem />
        <HomeMyHabbitItem />
        <HomeReminderItem />
        <HomeSpendsItem />
        <HomeTimerItem />
        <HomeShareItem />
      </div>
    </div>
  );
}

export default HomeList;
