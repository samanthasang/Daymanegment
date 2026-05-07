import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import HabbitList from "./HabbitList/HabbitList.component";

function HabbitListComponent() {
  return (
    <Suspense>
      <PageContainer witDate={false}>
        <HabbitList />
      </PageContainer>
    </Suspense>
  );
}

export default HabbitListComponent;
