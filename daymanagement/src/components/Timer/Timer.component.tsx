import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import TimerList from "./TimerList/TimerList.component";

function TimerListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <TimerList />
      </PageContainer>
    </Suspense>
  );
}

export default TimerListComponent;
