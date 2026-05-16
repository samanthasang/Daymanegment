import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import ShareList from "./ShareList/ShareList.component";

function ShareListComponent() {
  return (
    <PageContainer>
      <Suspense>
        <ShareList />
      </Suspense>
    </PageContainer>
  );
}

export default ShareListComponent;
