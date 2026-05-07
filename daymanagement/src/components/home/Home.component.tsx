"use client";
import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import HomeList from "./HomeList/HomeList.component";

function HomeComponent() {
  return (
    <Suspense>
      <PageContainer witDate={false}>
        <HomeList />
      </PageContainer>
    </Suspense>
  );
}

export default HomeComponent;
