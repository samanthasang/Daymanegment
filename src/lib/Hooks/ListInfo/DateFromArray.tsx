function DateFromArray(List: any[], date: number) {
  return List?.filter((list) => list.doDate >= date);
}

export default DateFromArray;
