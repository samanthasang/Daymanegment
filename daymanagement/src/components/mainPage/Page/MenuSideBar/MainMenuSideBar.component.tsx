import HomeGoalsItem from "@/components/home/HomeItems/HomeGoalsItem.component";
import HomeHabbitItem from "@/components/home/HomeItems/HomeHabbitItem.component";
import HomeInstallmentsItem from "@/components/home/HomeItems/HomeInstallmentsItem.component";
import HomeReminderItem from "@/components/home/HomeItems/HomeReminderItem.component";
import HomeShareItem from "@/components/home/HomeItems/HomeSharesItem.component";
import HomeSpendsItem from "@/components/home/HomeItems/HomeSpendsItem.component";
import HomeTimerItem from "@/components/home/HomeItems/HomeTimerItem.component";
import HomeTodoList from "@/components/home/HomeItems/HomeTodoItem.component";
import HomeVisitItem from "@/components/home/HomeItems/HomeVisitItem.component";

function MenuMainSideBarComponent() {
  return (
    <div className="bg-secondary w-full flex flex-col justify-start items-start h-full rounded-2xl py-1 gap-y-0.5">
      <HomeTodoList />
      <HomeSpendsItem />
      <HomeHabbitItem />
      <HomeTimerItem />
      <HomeVisitItem />
      <HomeReminderItem />
      <HomeInstallmentsItem />
      <HomeGoalsItem />
      <HomeShareItem />
    </div>
  );
}

export default MenuMainSideBarComponent;
