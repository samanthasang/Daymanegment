import { AccountBalance, EventAvailable, Filter } from "@/components/icons";
import { useAppDispatch } from "@/lib/hook";
import {
  changeFilterStatuse,
  changeMenuStatuse,
} from "@/modules/menu/menu.slice";
import Link from "next/link";

function MenuBottomSideBarComponent({
  OpenMenu,
  OpenFilter,
}: {
  OpenMenu: boolean;
  OpenFilter: boolean;
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-around w-full mx-auto h-10 px-1 absolute bottom-0 left-0 right-0">
      {OpenMenu && (
        <>
          <Link
            href={"/"}
            className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
          >
            <EventAvailable />
          </Link>
          <div
            onClick={(e) => {
              e && e.preventDefault();
              // dispatch(selectToDoList(""));
            }}
            className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
          >
            <EventAvailable />
          </div>
        </>
      )}
      <div
        onClick={() => dispatch(changeFilterStatuse())}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <Filter />
      </div>
      <div
        onClick={() => dispatch(changeMenuStatuse())}
        className="flex justify-center items-center h-9 flex-1 rounded-full hover:bg-slate-800 w-full cursor-pointer"
      >
        <AccountBalance />
      </div>
    </div>
  );
}

export default MenuBottomSideBarComponent;
