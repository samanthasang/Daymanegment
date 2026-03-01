import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Done, DoneAll, Trash } from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ListPriority from "../ListPriority/ListPriority.component";
import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ListItem = ({
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  date,
  score,
  drawerType,
  formType,
  withDel = true,
  SelectItem,
  DelItem,
  CompleteItemt,
  UpdateItem,
}: {
  id?: string;
  priority?: string;
  title: string;
  category?: string;
  tag?: string;
  isComplete?: boolean;
  withDel?: boolean;
  date?: string;
  score?: number;
  drawerType: string;
  formType: string;
  SelectItem: () => void;
  DelItem: () => void;
  CompleteItemt: () => void;
  UpdateItem?: () => void;
}) => {
  return (
    <DrawerDialogDemo drawerType={drawerType} formType={formType}>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            id && SelectItem();
          }}
          className="w-full h-fit cursor-pointer flex flex-row items-start justify-start p-3 
          bg-[rgba(255,_255,_255,_0.25)] backdrop-filter backdrop-blur-[10px] rounded-[16px] border-[1px] border-solid border-[rgba(255,255,255,0.35)] [box-shadow:0_8px_32px_0_rgba(31,_38,_135,_0.1)]"
        >
          <div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
            <div className="select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
              <label
                htmlFor="terms"
                className={`cursor-pointer flex justify-center items-center gap-2`}
              >
                {priority && <ListPriority priority={priority} />}
                {title || ""}
              </label>
            </div>
            <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
              {category && <ListCategorySelected category={category} />}
              {tag && <ListTagSelected tag={tag} />}
            </div>
          </div>
          <div className="flex flex-col w-fit gap-2 justify-end items-end">
            <div className="flex flex-row gap-x-2">
              {withDel && (
                <div
                  onClick={(e) => {
                    e && e.preventDefault();
                    (score && score == 1) || (!isComplete && DelItem());
                  }}
                  className="flex justify-center items-center h-5 w-5 bg-white/80 rounded-full"
                >
                  <Trash />
                </div>
              )}
              {drawerType == "ReminderList" && UpdateItem ? (
                <>
                  <div
                    onClick={(e) => {
                      e && e.preventDefault();
                      CompleteItemt();
                    }}
                  >
                    <Done />
                  </div>
                  <div
                    onClick={(e) => {
                      e && e.preventDefault();
                      UpdateItem();
                    }}
                  >
                    <DoneAll />
                  </div>
                </>
              ) : (
                <BasicSwitch
                  checked={isComplete || false}
                  handleToggle={(e) => {
                    e && e.preventDefault();
                    !isComplete && CompleteItemt();
                  }}
                  label=""
                  key={"isComplete"}
                />
              )}
            </div>

            <label
              className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}
            >
              {date && dayjs(dayjs.unix(Number(date))).format("YYYY-MM-DD")}
              {score && `(${score || 0})`}
            </label>
          </div>
        </div>
      </DialogTrigger>
    </DrawerDialogDemo>
  );
};

export default ListItem;
