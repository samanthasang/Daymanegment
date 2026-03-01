import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import SidebarContainer from "../mainPage/sidebarContainer/sidebarContainer.componen";
import TodoList from "./TodoList/TodoList.component";

function TodoListComponent() {
  return (
    <PageContainer title="TodoList">
      <SidebarContainer drawerType="TodoList" formType="Add Todo" witDate />
      <TodoList />
    </PageContainer>
  );
}

export default TodoListComponent;
