"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import SidebarContainer from "../mainPage/sidebarContainer/sidebarContainer.componen";
import HabbitList from "./HabbitList/HabbitList.component";

function HabbitListComponent() {
  return (
    <PageContainer title="HabbitList">
      <SidebarContainer drawerType="HabbitList" formType="Add Habbit" />
      <HabbitList />
    </PageContainer>
  );
}

export default HabbitListComponent;
