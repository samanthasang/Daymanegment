"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import HomeList from "./HomeList/HomeList.component";

function HomeComponent() {
  return (
    <PageContainer witDate={false}>
      <HomeList />
    </PageContainer>
  );
}

export default HomeComponent;
