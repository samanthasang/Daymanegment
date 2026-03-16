import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import MyHabbitList from "./MyHabbitList/MyHabbitList.component";

function MyHabbitListComponent() {
  return (
    <PageContainer witDate={false}>
      <MyHabbitList />
    </PageContainer>
  );
}

export default MyHabbitListComponent;
