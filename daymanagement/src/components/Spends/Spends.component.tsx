import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import SpendsList from "./SpendsList/SpendsList.component";

function SpendsListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <SpendsList />
      </PageContainer>
    </Suspense>
  );
}

export default SpendsListComponent;
