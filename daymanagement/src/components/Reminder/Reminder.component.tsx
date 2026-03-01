"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import SidebarContainer from "../mainPage/sidebarContainer/sidebarContainer.componen";
import ReminderSideBar from "./ReminderFilter/ReminderSideBar.componen";
import ReminderList from "./ReminderList/ReminderList.component";

function ReminderListComponent() {
  return (
    <PageContainer title="ReminderList">
      <SidebarContainer
        drawerType="ReminderList"
        formType="Add Reminder"
        witDate
      />
      <ReminderList />
    </PageContainer>
  );
}

export default ReminderListComponent;
