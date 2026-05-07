import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import ReminderList from "./RemindersList/ReminderList.component";

function ReminderListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <ReminderList />
      </PageContainer>
    </Suspense>
  );
}

export default ReminderListComponent;
