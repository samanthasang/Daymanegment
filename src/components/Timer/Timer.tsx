import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";

export default function TimerComponent() {
  const [todayTime, setTodyTime] = useState<any>([]);
  const [todayTimeCount, setTodyTimeCount] = useState([]);
  const inputRef = useRef<any>(null);

  const handleClick = () => {
    // check if the ref is set
    if (inputRef.current === null) return;
    console.log("date picker");

    inputRef.current.showPicker();
  };
  const handleTime = () => {
    const pair = _.chunk(todayTime, 2);
    pair.map((p) => {
      console.log(dayjs(p[1]).diff(dayjs(p[0])));
      // console.log(
      //   dayjs.duration(dayjs(p[1]).diff(dayjs(p[0]))).format("HH:mm:ss")
      // );
    });
    console.log(pair);
  };

  useEffect(() => {
    todayTime.length > 2 && handleTime();
  }, [todayTime]);

  function repeatStr(n, s) {
    
    return s.repeat(n);
  }
  console.log(repeatStr(3, "*"));
  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 h-4/5">
        {todayTime.length > 0 &&
          todayTime.map((time, index) => (
            <div className="flex justify-between w-60" onClick={handleClick}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  id="datetime-local"
                  label={index % 2 == 0 ? "inter" : "Exit"}
                  defaultValue={dayjs(
                    moment.unix(time).format("yyyy-MM-DDThh:mm")
                  )}
                  sx={{
                    width: 250,
                    color: "#fff",
                    "& .MuiFormLabel-root": {
                      color: "#fff",
                    },
                    "& .MuiInputBase-root": {
                      color: "#fff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFF",
                    },
                    "& .MuiButtonBase-root": {
                      color: "#fff",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          ))}
      </div>
      <Button
        variant="contained"
        onClick={() =>
          setTodyTime((perv) => {
            return todayTime.length > 0
              ? [...perv, dayjs().unix()]
              : [dayjs().unix()];
          })
        }
      >
        Contained
      </Button>
    </div>
  );
}
