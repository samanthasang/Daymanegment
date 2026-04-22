import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";
import ListItemShare from "./ListItemShareItem.component";

export const ListItemCatTag = ({
  id,
  category,
  tag,
  hasShare,
}: {
  id?: string;
  category?: string;
  tag?: string;
  hasShare?: boolean;
}) => {
  return (
    <>
      {(category || tag) && (
        <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
          {category && <ListCategorySelected category={category} />}
          {tag && <ListTagSelected tag={tag} />}
        </div>
      )}
      {hasShare && <ListItemShare peopleId={id} />}
    </>
  );
};

export default ListItemCatTag;
