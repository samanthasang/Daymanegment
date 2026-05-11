function IncomeArray(List: any[]) {
  return List?.filter((a) => a && !a.income);
}

export default IncomeArray;
