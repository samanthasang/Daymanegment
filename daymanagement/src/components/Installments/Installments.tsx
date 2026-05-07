import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import InstallmentsList from "./InstallmentsList/InstallmentsList.component";

function InstallmentsListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <InstallmentsList />
      </PageContainer>
    </Suspense>
  );
}

export default InstallmentsListComponent;
