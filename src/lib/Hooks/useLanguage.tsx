"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hook";

function UseLangState() {
	const { lang } = useAppSelector((state) => state.Menu) || "en";

	const [langChoosen, setLangChoosen] = useState("en");

	useEffect(() => {
		lang == "en" ? setLangChoosen("en") : setLangChoosen("fa");
	}, [lang]);

	return langChoosen;
}
export default UseLangState;
