import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import HabbitList from "./HabbitList/HabbitList.component";

function HabbitListComponent() {
  return (
    <PageContainer witDate={false}>
        <HabbitList />
    </PageContainer>
  );
}

export default HabbitListComponent;
