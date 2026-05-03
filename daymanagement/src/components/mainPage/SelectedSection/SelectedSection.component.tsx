import SelectedContainer from "./selectedItem/SelectedContainer.component";
import SelectedItem from "./selectedItem/SelectedItem.component";
import SelectedMenuBottom from "./selectedItem/SelectedMenuBottom.component";

function SelectedSection({
  selected,
  drawerType,
  formType,
  time,
  score,
  isFinish,
  isComplete,
  isPause,
  SelectItem,
  FinishItem,
  CompleteItem,
  DelItem,
  PauseItem,
  UndoneItem,
  DuplicateItem,
  BringTodayItem,
}: {
  selected: any;
  score?: number;
  time?: number;
  drawerType: string;
  formType: string;
  isComplete?: boolean;
  isFinish?: boolean;
  isPause?: boolean;
  SelectItem: () => void;
  FinishItem?: () => void;
  CompleteItem?: () => void;
  DelItem?: () => void;
  PauseItem?: () => void;
  UndoneItem?: () => void;
  DuplicateItem?: boolean;
  BringTodayItem?: () => void;
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
          isPause={isPause}
          FinishItem={FinishItem}
          CompleteItem={CompleteItem}
          BringTodayItem={BringTodayItem}
          DelItem={DelItem}
          DuplicateItem={DuplicateItem}
          PauseItem={PauseItem}
          UndoneItem={UndoneItem}
          {...selected}
        />
        <SelectedMenuBottom
          drawerType={drawerType}
          formType={formType}
          isComplete={isComplete}
          isFinish={isFinish}
          isPause={isPause}
          FinishItem={FinishItem}
          CompleteItem={CompleteItem}
          DelItem={DelItem}
          SelectItem={SelectItem}
        />
      </SelectedContainer>
    )
  );
}

export default SelectedSection;
