function ComplateSortFIlter(List: any[]) {
  return List?.sort((a, b) => +a.isComplete - +b.isComplete);
}

export default ComplateSortFIlter;
