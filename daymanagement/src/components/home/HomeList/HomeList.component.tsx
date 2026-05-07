import HomeListContainer from "./HomeListContainer.component";
import SectionOne from "./SectionOne.component";
import SectionThree from "./SectionThree.component";
import SectionTwo from "./SectionTwoList.component";

function HomeList() {
  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full h-full mx-auto">
      <HomeListContainer>
        <div className="h-1/2">
          <SectionOne />
        </div>
        <div className="h-1/2">
          <SectionTwo />
        </div>
      </HomeListContainer>
      <HomeListContainer>
        <SectionThree />
      </HomeListContainer>
    </div>
  );
}

export default HomeList;
