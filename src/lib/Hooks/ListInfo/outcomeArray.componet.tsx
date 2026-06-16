function OutcomeArray(List: any[]) {
  return List?.filter((a) => a && a.income);
}

export default OutcomeArray;
