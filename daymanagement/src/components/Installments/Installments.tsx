"use client"
import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

interface IFormInputs {
  installments: string;
  installmentstime: number
}


export default function Installments() {
  const [todayTime, setTodyTime] = useState<any>([]);
  const [todayTimeCount, setTodyTimeCount] = useState([]);
  const inputRef = useRef<any>(null);

  const handleClick = () => {
    // check if the ref is set
    if (inputRef.current === null) return;
    console.log("date picker");

    inputRef.current.showPicker();
  };
     const formSchema = z.object({
      installments: z.string().min(1, { message: 'installments is required' }),
      installmentstime: z.number().positive(),
    });
    type FormData = z.infer<typeof formSchema>
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  
    const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)
  
  const handleTime = () => {
    // const pair = _.chunk(todayTime, 2);
    // pair.map((p) => {
    //   console.log(dayjs(p[1]).diff(dayjs(p[0])));
    //   // console.log(
    //   //   dayjs.duration(dayjs(p[1]).diff(dayjs(p[0]))).format("HH:mm:ss")
    //   // );
    // });
    // console.log(pair);
  };

  useEffect(() => {
    todayTime.length > 2 && handleTime();
  }, [todayTime]);

  return (
    <div className="">
      <div className="flex flex-col gap-4 h-4/5">
      <form 
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue = {''}
        name="installments"
        control={control}
        rules={{ required: true }}
          render={({ field }) =>
            <input
            type="text"
          className="text-black"
          {...field}
          />
          }
      />
      <Controller
        defaultValue = {1}
        name="installmentstime"
        control={control}
        rules={{ required: true }}
          render={({ field }) =>
            <input
              type="number"
          className="text-black"
          {...field}
          />
          }
      />
      <input type="submit" />
      </form>
      </div>
    </div>
  );
}
