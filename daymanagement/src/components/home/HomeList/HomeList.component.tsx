import HomeListContainer from "./HomeListContainer.component";
import SectionFour from "./SectionFour.component";
import SectionOne from "./SectionOne.component";
import SectionThree from "./SectionThree.component";
import SectionTwo from "./SectionTwoList.component";

function HomeList() {
  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <div className="flex flex-row gap-x-3 w-2/3 mx-auto">
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
      <div className="flex flex-row gap-x-3 w-1/3 mx-auto">
        <HomeListContainer>
          <SectionFour />
        </HomeListContainer>
      </div>
    </div>
  );
}

export default HomeList;
