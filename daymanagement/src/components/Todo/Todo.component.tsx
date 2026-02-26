"use client";
import PageContainer from "../mainPage/PageContainer/PageContainer.component";
import TodoSideBar from "./TodoFilter/TodoSideBar.componen";
import TodoList from "./TodoList/TodoList.component";

function TodoListComponent() {
  return (
    <PageContainer title="TodoList">
      <TodoSideBar />
      <TodoList />
    </PageContainer>
  );
}

export default TodoListComponent;
