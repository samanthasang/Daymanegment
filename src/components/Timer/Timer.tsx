"use client"
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs.extend(utc)
dayjs.extend(timezone)


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
  const handleTime = useCallback(
    () => {
      
    const pair = _.chunk(todayTime, 2);
    pair.map((p) => {
      console.log(dayjs(p[1]).diff(dayjs(p[0])));
      // console.log(
      //   dayjs.duration(dayjs(p[1]).diff(dayjs(p[0]))).format("HH:mm:ss")
      // );
    });
    },
    [todayTime],
  );

  useEffect(() => {
    if(todayTime.length > 2) handleTime();
  }, [handleTime, todayTime]);

  function repeatStr(n, s) {
    
    return s.repeat(n);
  }
  console.log(repeatStr(3, "*"));
  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 h-4/5">
        {todayTime.length > 0 &&
          todayTime.map((time, index) => (
            <div key={index} className="flex justify-between w-60" onClick={handleClick}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  id="datetime-local"
                  label={index % 2 == 0 ? "inter" : "Exit"}
                  defaultValue={dayjs(
                    dayjs(time).unix()
                  ).format("yyyy-MM-DDThh:mm")}
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
