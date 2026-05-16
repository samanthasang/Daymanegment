import { Suspense } from "react";
import PageContainer from "../mainPage/Page/PageContainer/PageContainer.component";
import TodoList from "./TodoList/TodoList.component";

function TodoListComponent() {
  return (
    <PageContainer>
      <TodoList />
    </PageContainer>
  );
}

export default TodoListComponent;
