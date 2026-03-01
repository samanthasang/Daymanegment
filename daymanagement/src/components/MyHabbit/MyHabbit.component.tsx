"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import SidebarContainer from "../mainPage/sidebarContainer/sidebarContainer.componen";
import MyHabbitList from "./MyHabbitList/MyHabbitList.component";

function MyHabbitListComponent() {
  return (
    <PageContainer title="MyHabbitList">
      <SidebarContainer
        drawerType="MyHabbitList"
        formType="Add Habbit"
        witAdd={false}
      />
      <MyHabbitList />
    </PageContainer>
  );
}

export default MyHabbitListComponent;
