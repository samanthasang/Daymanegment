function FinishedArray(List: any[]) {
  return List?.filter((a) => !a.isComplete);
}

export default FinishedArray;
