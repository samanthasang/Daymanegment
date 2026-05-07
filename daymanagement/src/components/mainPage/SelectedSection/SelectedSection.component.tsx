import ListTitle from "../ListSection/ListContainer/ListTitle.component";
import SelectedContainer from "./selectedItem/SelectedContainer.component";
import SelectedItem from "./selectedItem/SelectedItem.component";
import SelectedMenuBottom from "./selectedItem/SelectedMenuBottom.component";

function SelectedSection({
  selected,
  drawerType,
  formType,
  drawerTitle,
  time,
  score,
  isFinish,
  isComplete,
  isPause,
  DuplicateItem,
  SelectItem,
  FinishItem,
  CompleteItem,
  DelItem,
  PauseItem,
  UndoneItem,
  BringTodayItem,
  DuplicateTodayItem,
  AddOneDayToItem,
  AddSevenDaysToItem,
}: {
  selected: any;
  score?: number;
  time?: number;
  drawerType: string;
  formType: string;
  drawerTitle: string;
  isComplete?: boolean;
  isFinish?: boolean;
  isPause?: boolean;
  DuplicateItem?: boolean;
  SelectItem: () => void;
  FinishItem?: () => void;
  CompleteItem?: () => void;
  DelItem?: () => void;
  PauseItem?: () => void;
  UndoneItem?: () => void;
  BringTodayItem?: () => void;
  DuplicateTodayItem?: () => void;
  AddOneDayToItem?: () => void;
  AddSevenDaysToItem?: () => void;
}) {
  return (
    selected &&
    selected.id && (
      <SelectedContainer>
        <ListTitle forgot title={drawerTitle} drawerType={drawerType} />
        <SelectedItem
          drawerType={drawerType}
          score={score}
          time={time}
          drawerTitle={drawerTitle}
          isComplete={isComplete}
          isFinish={isFinish}
          isPause={isPause}
          FinishItem={FinishItem}
          CompleteItem={CompleteItem}
          BringTodayItem={BringTodayItem}
          DelItem={DelItem}
          DuplicateItem
          PauseItem={PauseItem}
          UndoneItem={UndoneItem}
          DuplicateTodayItem={DuplicateTodayItem}
          AddOneDayToItem={AddOneDayToItem}
          AddSevenDaysToItem={AddSevenDaysToItem}
          {...selected}
        />
        <SelectedMenuBottom
          drawerType={drawerType}
          formType={formType}
          drawerTitle={selected.title}
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
