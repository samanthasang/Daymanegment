import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import GoalsList from "./GoalsList/GoalsList.component";

function GoalsListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <GoalsList />
      </PageContainer>
    </Suspense>
  );
}

export default GoalsListComponent;
