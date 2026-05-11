import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";

export const ListItemCatTag = ({
  category,
  tag,
  hasShare,
}: {
  id?: string;
  category?: string;
  tag?: string;
  hasShare?: number;
}) => {
  return (
    <>
      {(category || tag) && (
        <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
          {category && <ListCategorySelected category={category} />}
          {tag && <ListTagSelected tag={tag} />}
        </div>
      )}
      {!!hasShare && (
        <label className="cursor-pointer px-2 py-1 rounded-2xl bg-white/15">
          Shares : {hasShare}
        </label>
      )}
    </>
  );
};

export default ListItemCatTag;
