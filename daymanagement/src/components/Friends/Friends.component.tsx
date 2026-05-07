import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import FriendsList from "./FriendsList/FriendsList.component";

function FriendsListComponent() {
  return (
    <Suspense>
      <PageContainer>
        <FriendsList />
      </PageContainer>
    </Suspense>
  );
}

export default FriendsListComponent;
