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
  drawerTitle: string;
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
