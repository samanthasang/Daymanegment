"use client";
import SidebarContainer from "@/components/mainPage/sidebarContainer/sidebarContainer.componen";
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";

function TodoSideBar() {
  const ListToDo = useTodoList();

  return (
    <>
      <SidebarContainer
        drawerType="TodoList"
        formType="Add Todo"
        number={`${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
        title="Todos"
        witDate
      />
      {/* <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
        <div className="flex flex-col flex-1 gap-4 w-full h-full">
          <div className="h-full">
            <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
              <FilterComponent witDate />

              <div className="flex justify-between w-full mx-auto h-9">
                <DrawerDialogDemo drawerType={"TodoList"} formType="Add Todo">
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <span>add</span>
                    </Button>
                  </DialogTrigger>
                </DrawerDialogDemo>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full mx-auto h-9">
            <span>
              {"Todos : " +
                `${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default TodoSideBar;
