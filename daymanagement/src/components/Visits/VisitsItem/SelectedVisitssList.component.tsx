"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import VisitListActivities from "@/lib/Hooks/Lists/Visit/VisitListActivities.component";

function SelectedVisitssList() {
  const { CompleteItemt, DelItem, SelectItem } = VisitListActivities();
  const { selectedVisit } = useVisitList();

  return (
    <SelectedContainer>
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(selectedVisit.id, selectedVisit.title)
        }
        time={selectedVisit.date}
        {...selectedVisit}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedVisit.id, selectedVisit.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="VisitsList"
        formType="Edit Visit"
        selectedIsComplete={selectedVisit.isComplete}
      />
    </SelectedContainer>
  );
}

export default SelectedVisitssList;
