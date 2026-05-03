"use client";

function DateToArray(List: any[], date: number) {
  return List?.filter((list) => +list.doDate <= +date);
}

export default DateToArray;
