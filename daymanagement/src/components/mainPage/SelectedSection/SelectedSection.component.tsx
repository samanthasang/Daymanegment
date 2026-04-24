import SelectedContainer from "./selectedItem/SelectedContainer.component";
import SelectedItem from "./selectedItem/SelectedItem.component";
import SelectedMenuBottom from "./selectedItem/SelectedMenuBottom.component";

function SelectedSection({
  selected,
  selectedIsComplete = false,
  drawerType,
  formType,
  time,
  score,
  total,
  totalIncome,
  totalOuCome,
  isFinish,
  isComplete,
  SelectItem,
  DelItem,
  CompleteItem,
  FinishItem,
}: {
  selected: any;
  score?: number;
  time?: number;
  selectedIsComplete?: boolean;
  drawerType: string;
  formType: string;
  total?: number;
  totalIncome?: number;
  totalOuCome?: number;
  isComplete?: boolean;
  isFinish?: boolean;
  SelectItem: () => void;
  DelItem?: () => void;
  CompleteItem?: () => void;
  FinishItem?: () => void;
}) {
  return (
    selected && (
      <SelectedContainer>
        <SelectedItem
          drawerType={drawerType}
          score={score}
          time={time}
          isComplete={isComplete}
          isFinish={isFinish}
          CompleteItem={CompleteItem}
          FinishItem={FinishItem}
          {...selected}
        />
        <SelectedMenuBottom
          drawerType={drawerType}
          formType={formType}
          selectedIsComplete={selectedIsComplete}
          CompleteItem={CompleteItem}
          DelItem={DelItem}
          SelectItem={SelectItem}
        />
      </SelectedContainer>
    )
  );
}

export default SelectedSection;
