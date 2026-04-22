function PrioritySortArray(List: any[]) {
  return List?.sort((a, b) => {
    const aOrder = a.priority == "High" ? 3 : a.priority == "Low" ? 1 : 2;
    const bOrder = b.priority == "High" ? 3 : b.priority == "Low" ? 1 : 2;
    return bOrder - aOrder;
  });
}

export default PrioritySortArray;
