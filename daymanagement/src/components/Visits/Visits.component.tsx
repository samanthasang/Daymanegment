import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import VisitsList from "./VisitsList/VisitsList.component";

function VisitListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <VisitsList />
      </PageContainer>
    </Suspense>
  );
}

export default VisitListComponent;
