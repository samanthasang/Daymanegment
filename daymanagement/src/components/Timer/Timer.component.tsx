"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import SidebarContainer from "../mainPage/sidebarContainer/sidebarContainer.componen";
import TimerList from "./TimerList/TimerList.component";

function TimerListComponent() {
  return (
    <PageContainer title="TimerList">
      <SidebarContainer drawerType="TimerList" formType="Add Timer" witDate />
      <TimerList />
    </PageContainer>
  );
}

export default TimerListComponent;
