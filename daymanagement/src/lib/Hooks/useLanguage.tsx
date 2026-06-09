"use client";
import { useAppSelector } from "../hook";

function UseLangState() {
  const { lang } = useAppSelector((state) => state.Menu);

  return lang;
}
export default UseLangState;
