"use client";
import HomeGoalsItem from "../HomeItems/HomeGoalsItem.component";
import HomeHabbitItem from "../HomeItems/HomeHabbitItem.component";
import HomeInstallmentsItem from "../HomeItems/HomeInstallmentsItem.component";
import HomeMyHabbitItem from "../HomeItems/HomeMyHabbitItem.component";
import HomeReminderItem from "../HomeItems/HomeReminderItem.component";
import HomeShareItem from "../HomeItems/HomeSharesItem.component";
import HomeSpendsItem from "../HomeItems/HomeSpendsItem.component";
import HomeTimerItem from "../HomeItems/HomeTimerItem.component";
import HomeTodoList from "../HomeItems/HomeTodoItem.component";
import HomeVisitItem from "../HomeItems/HomeVisitItem.component";

function HomeList() {
  return (
    <div className={"col-span-2 md:col-span-3 w-full h-auto"}>
      <div className="grid grid-rows-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
