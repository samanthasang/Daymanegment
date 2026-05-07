import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import ShareList from "./ShareList/ShareList.component";

function ShareListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <ShareList />
      </PageContainer>
    </Suspense>
  );
}

export default ShareListComponent;
