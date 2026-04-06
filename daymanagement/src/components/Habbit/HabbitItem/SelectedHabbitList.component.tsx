"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";

function SelectedHabbitList() {
  const { CompleteItemt, DelItem, SelectItem } = SelectHabbitListActivities();

  const { selectedHabbit } = UseHabbitList();

  // const MoveToMyHabbit = (item: Thabbit) => {
  //   dispatch(
  //     setMyHabbitList({
  //       id: item.id,
  //       title: item.title,
  //       description: item.description || "",
  //       score: item.score + 1,
  //       priority: item.priority,
  //       lastUpdate: Math.floor(
  //         new Date(currentUnixTimestamp).getTime()
  //       ).toString(),
  //       completeUpdate: item
  //         ? item.completeUpdate
  //         : Math.floor(new Date(currentUnixTimestamp).getTime()).toString(),
  //       category: item.category,
  //       tag: item.tag,
  //     })
  //   );
  //   dispatch(delHabbitList(item.id));
  // };
  return (
    <SelectedContainer>
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(selectedHabbit.id, selectedHabbit.title)
        }
        isComplete={
          DayUnixFormat(+selectedHabbit.completeUpdate, "DD") ==
          DayUnixFormatNow("DD")
        }
        drawerType="HabbitList"
        {...selectedHabbit}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedHabbit.id, selectedHabbit.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="HabbitList"
        formType="Edit Habbit"
        selectedIsComplete={
          DayUnixFormat(+selectedHabbit.completeUpdate, "DD") ==
          DayUnixFormatNow("DD")
        }
      />
    </SelectedContainer>
  );
}

export default SelectedHabbitList;
