import { useAppDispatch, useAppSelector } from "@/lib/hook";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import { changeLang } from "@/modules/menu/menu.slice";
import { useEffect } from "react";

function MenuMainLangComponent() {
  const dispatch = useAppDispatch();

  const { lang } = useAppSelector((state) => state.Menu);
  const langChoosen = UseLangComponent("Menu");
  useEffect(() => {
    console.log(langChoosen);
  }, [lang]);

  return (
    <div className="w-full flex justify-center items-center gap-x-1 bg-primary rounded-full p-1 my-2">
      <div
        className={cn(
          "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
          lang == "en" ? "bg-card/15 text-card" : "text-TextForeground"
        )}
        onClick={() => dispatch(changeLang())}
      >
        EN
      </div>
      <div
        className={cn(
          "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
          lang == "fa" ? "bg-card/15 text-card" : "text-TextForeground "
        )}
        onClick={() => dispatch(changeLang())}
      >
        FA
      </div>
    </div>
  );
}

export default MenuMainLangComponent;
