"use client"
import { useAppSelector } from '@/lib/hook';
import { Tinstallmentst } from '@/modules/installmentstList/installmentst.slice';
import { TToDo } from '@/modules/toDoList/todo.slice';
import { useEffect } from "react";
import AddInstallments from './AddInstallments/AddInstallments';
import InstallmentsItem from './InstallmentsItem/Installments.component';

interface IFormInputs {
  installments: string;
  installmentstime: number
}


export default function Installments() {
  const { ListInstallmentst, selectedInstallmentst }: {
     ListInstallmentst: Tinstallmentst[];
    selectedInstallmentst: {};
} = useAppSelector((state) => state.InstallmentstList) || [];
  useEffect(() => {
    console.log(ListInstallmentst);
  }, [ListInstallmentst]);
  return (
      <div className="w-2/3 m-auto bg-secondary">
        <div className="w-full text-center border-b p-3">TodoList</div>
        <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
          <AddInstallments />
          <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
           scroll-m-0 overflow-y-scroll">
  
          {ListInstallmentst != null && ListInstallmentst.length > 0 && (
              <div className="flex flex-col gap-4 w-full ">
                <div className="flex justify-between w-full">
                  <span>
                    {"Todos : " +  ListInstallmentst?.length}
                  </span>
                  <span>
                    {"Completed : " +  ListInstallmentst?.filter((todo) => todo.isComplete == true).length}
                  </span>
  
                </div>
              {ListInstallmentst?.map((li: Tinstallmentst) => (
                <InstallmentsItem
                  key={li.id}
                  item={li}
                              
                />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
  );
}
