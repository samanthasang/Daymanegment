function IncomeArray(List: any[]) {
  return List?.filter((a) => !a.income);
}

export default IncomeArray;
