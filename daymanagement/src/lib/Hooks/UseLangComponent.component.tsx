"use client";
import { faLang } from "@/locales/fa/fa";
import { useAppSelector } from "../hook";
import { enLang } from "@/locales/en/en";
import { useEffect, useState } from "react";

function UseLangComponent(
  section:
    | "Todos"
    | "Reminders"
    | "Habbits"
    | "Timers"
    | "Spends"
    | "CategoryList"
    | "TagList"
    | "Friends"
    | "Visits"
    | "Goals"
    | "Shares"
    | "Menu"
    | "Form"
    | "Drawer"
) {
  const [langChoosen, setLangChoosen] = useState(enLang);

  const { lang } = useAppSelector((state) => state.Menu);

  useEffect(() => {
    lang == "en" ? setLangChoosen(enLang) : setLangChoosen(faLang);
  }, [lang]);

  return langChoosen[section];
}
export default UseLangComponent;
