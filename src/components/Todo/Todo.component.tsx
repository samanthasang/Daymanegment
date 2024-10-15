import { useEffect, useState } from "react";
import AddToDo from "./AddTodo/AddToDo";

function TodoListComponent() {
  const [list, setList] = useState(null);

  useEffect(() => {
    console.log(list);
    list && list.map((li) => console.log(li));
  }, [list]);

  return (
    <>
      <div>TodoList</div>
      <div className="flex flex-row gap-4">
        <AddToDo setList={setList} />
        {list != null && list.length > 0 && (
          <div className="flex flex-col gap-4 red">
            {list.map((li) => (
              <span>{li}</span>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => listTOdo && addList(listTOdo)}>get</button>
    </>
  );
}

export default TodoListComponent;
