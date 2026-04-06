"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";

function SelectedTodoList() {
  const { CompleteItemt, DelItem, SelectItem } = TodoListActivities();
  const { selectedToDo } = useTodoList();

  return (
    <SelectedContainer>
      <SelectedItem
        CompleteItemt={() => CompleteItemt(selectedToDo.id, selectedToDo.title)}
        {...selectedToDo}
      />
      <SelectedMenuBottom
        CompleteItemt={() => CompleteItemt(selectedToDo.id, selectedToDo.title)}
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="TodoList"
        formType="Edit Todo"
        selectedIsComplete={selectedToDo.isComplete}
      />
    </SelectedContainer>
  );
}

export default SelectedTodoList;
