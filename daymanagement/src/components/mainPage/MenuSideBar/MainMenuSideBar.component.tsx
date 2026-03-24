import HomeGoalsItem from "@/components/home/HomeItems/HomeGoalsItem.component";
import HomeHabbitItem from "@/components/home/HomeItems/HomeHabbitItem.component";
import HomeInstallmentsItem from "@/components/home/HomeItems/HomeInstallmentsItem.component";
import HomeMyHabbitItem from "@/components/home/HomeItems/HomeMyHabbitItem.component";
import HomeReminderItem from "@/components/home/HomeItems/HomeReminderItem.component";
import HomeShareItem from "@/components/home/HomeItems/HomeSharesItem.component";
import HomeSpendsItem from "@/components/home/HomeItems/HomeSpendsItem.component";
import HomeTimerItem from "@/components/home/HomeItems/HomeTimerItem.component";
import HomeTodoList from "@/components/home/HomeItems/HomeTodoItem.component";
import HomeVisitItem from "@/components/home/HomeItems/HomeVisitItem.component";

function MenuMainSideBarComponent({
  OpenMenu,
  pathname,
}: {
  OpenMenu: boolean;
  pathname: string;
}) {
  return (
    <div className="bg-secondary w-full flex flex-col justify-start items-start h-full rounded-2xl p-0.5">
      <HomeTodoList pathname={pathname} OpenMenu={OpenMenu} />
      <HomeSpendsItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeHabbitItem pathname={pathname} OpenMenu={OpenMenu} />
      {/* <HomeMyHabbitItem pathname={pathname} OpenMenu={OpenMenu} /> */}
      <HomeTimerItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeVisitItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeReminderItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeInstallmentsItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeGoalsItem pathname={pathname} OpenMenu={OpenMenu} />
      <HomeShareItem pathname={pathname} OpenMenu={OpenMenu} />
    </div>
  );
}

export default MenuMainSideBarComponent;
