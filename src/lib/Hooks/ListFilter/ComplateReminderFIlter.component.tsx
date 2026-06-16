"use client";
import { useMemo, useState } from "react";

function DateFIlter(List: any[]) {
  const [dateFIlter, setDateFIlter] = useState(true);

  const dateArray = useMemo(
    () => (dateFIlter ? [...List]?.sort((a, b) => +a.date + +b.date) : List),
    [dateFIlter, List]
  );

  return { dateArray, dateFIlter, setDateFIlter };
}

export default DateFIlter;
