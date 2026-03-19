"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import { TToDo } from "@/modules/toDoList/todo.slice";

function SelectedTodoList() {
  const { CompleteItemt, DelItem, SelectItem } = TodoListActivities();

  const ToDo = useAppSelector((state) => state.todoList);

  const selectedToDo = ToDo?.selectedToDo as TToDo;

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
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
    </div>
  );
}

export default SelectedTodoList;
