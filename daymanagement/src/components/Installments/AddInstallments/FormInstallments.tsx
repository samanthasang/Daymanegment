"use client"
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { setInstallmentstList, updateInstallmentstList } from "@/modules/installmentstList/installmentst.slice";
import { selectSpendsList, setSpendsList, updateSpendsList } from "@/modules/spends/spends.slice";
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";


interface IFormInputs {
  title: string
  startDate: string
  description: string,
  priority: string,
  lastUpdate: string
  completeUpdate: string
  paymentNumber:string
  numberOfPayment?: string
  paymentCompleteValue:string
  category:string
  tag: string
  installmentstList: {
    date: string
    payment: string
    isComplete: boolean
  }[]
}

export default function FormInstallments({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [date, setDate] = useState<Date>()
  
// creating a schema for strings 
   const formSchema = z.object({
    title: z.string().min(4, { message: 'Name is required' }),
    description: z.string().min(4, { message: 'Name is required' }),
    income: z.boolean().optional(),
    paymentNumber: z.string().min(1, { message: 'Payment Number is required' }),
    numberOfPayment: z.string().min(1, { message: 'Number Of Payment is required' }),
    paymentCompleteValue: z.string().min(1, { message: 'Payment Complete Value is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    tag: z.string().min(1, { message: 'Tag is required' }),
    startDate: z.string().min(1, { message: 'date is required' }),
    lastUpdate: z.string().min(1, { message: 'date is required' }),
    completeUpdate: z.string().min(1, { message: 'date is required' }),
  });
  type FormData = z.infer<typeof formSchema>

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    getValues,
    watch
  } = methods;

  useEffect(() => {
     date && setValue("startDate", Math.floor(new Date(date).getTime()/1000.0).toString())
  }, [date])
  
  const dispatch = useAppDispatch();
  const { selectedInstallmentst } : any = useAppSelector((state) => state.InstallmentstList) || {};
  
  useEffect(() => {
    if (selectedInstallmentst) {
      setValue("title", selectedInstallmentst?.title)
      setValue("description", selectedInstallmentst?.description)
      setValue("paymentNumber", selectedInstallmentst.paymentNumber)
      setValue("numberOfPayment", selectedInstallmentst.numberOfPayment)
      setValue("paymentCompleteValue", selectedInstallmentst.paymentCompleteValue)
      setValue("category", selectedInstallmentst.category)
      setValue("tag", selectedInstallmentst.tag)
      setValue("startDate", selectedInstallmentst.startDate)
      setValue("lastUpdate", selectedInstallmentst.lastUpdate)
      setValue("completeUpdate", selectedInstallmentst.completeUpdate)
      setDate(new Date(Number(selectedInstallmentst.date) * 1000))
    }
  }, [selectedInstallmentst, setValue])
  
  const handleCategory = (data: string) => {
    setValue("category", data)
  }
  const handleTag = (data: string) => {
    setValue("tag", data)
  }

  useEffect(() => {
    console.log(errors);
    console.log(getValues());
    
  
  }, [getValues( ) , errors])
  


  const onSubmit: SubmitHandler<IFormInputs> = (data) => {

    console.log(data);
    
    selectedInstallmentst?.title ? dispatch(updateInstallmentstList(
      {
        id: selectedInstallmentst.id,
        title: data.title,
        startDate: date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.startDate,
        lastUpdate: "string",
        completeUpdate: "string",
        description: data.description || "",
        priority: data.priority || "",
        paymentNumber: data.paymentNumber || "",
        numberOfPayment: data.numberOfPayment || "",
        paymentCompleteValue: data.paymentCompleteValue || "",
        category: data.category,
        tag: data.tag,
        installmentstList: [{
          date: "string",
          payment: "string",
          isComplete: false
        }]
      })) :
      dispatch(setInstallmentstList({
        id: "",
        title: data.title,
        startDate: date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.startDate,
        lastUpdate: "string",
        completeUpdate: "string",
        description: data.description || "",
        priority: data.priority || "",
        paymentNumber: data.paymentNumber || "",
        numberOfPayment: data.numberOfPayment || "",
        paymentCompleteValue: data.paymentCompleteValue || "",
        category: data.category,
        tag: data.tag,
        installmentstList: [{
          date: "string",
          payment: "string",
          isComplete: false
        }]
      }))
    dispatch(selectSpendsList(""))
    setValue("startDate", "")
    reset()
    onSubmitForm()
  };

  const onReset = () => {
    dispatch(selectSpendsList(""))
      setValue("startDate", "")
    reset()
  };
  
  return (
    <div className="col-span-1 w-auto">
      <div className="flex flex-row gap-2 w-auto">

      <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4">
          
          <div className="flex flex-col sm:flex-row w-full gap-x-4">
            <div className="w-1/2 min-w-60 flex flex-col gap-y-4">
              <Controller
                defaultValue = {''}
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <Input
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Name"
                    {...field}
                />
              }
            />
            {errors.title?.message && <p className="text-xs text-red-500">{errors.title?.message}</p>}
            
            <div>
              <Controller
                defaultValue = {''}
                name="paymentNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <Input
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Number Of Product"
                    type="tel"
                    {...field}
                />
              }
            />
            {errors.paymentNumber?.message && <p className="text-xs text-red-500">{errors.paymentNumber?.message}</p>}
              
              <Controller
                defaultValue = {''}
                name="numberOfPayment"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <Input
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Price Of Product"
                    type="tel"
                    {...field}
                />
              }
            />
            {errors.numberOfPayment?.message && <p className="text-xs text-red-500">{errors.numberOfPayment?.message}</p>}
              </div>


             {watch("income") &&  <Controller
                defaultValue = {''}
                name="paymentCompleteValue"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <Input
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Income Amount"
                    type="tel"
                    {...field}
                />
              }
              />
              }
              {errors.paymentCompleteValue?.message && <p className="text-xs text-red-500">{errors.paymentCompleteValue?.message}</p>}


              <div className="flex flex-row">
            <div className="flex-1">
              <Controller
                defaultValue = {''}
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <CategotySelectComponent onClickChange={handleCategory} value={field.value} />
                  }
              />
              {errors.category?.message && <p className="text-xs text-red-500">{errors.category?.message}</p>}
            </div>
            <DrawerDialogDemo drawerType={'TagList'} formType="Add Tag">
              <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                  <Edit />
                </div> 
              </DialogTrigger>
            </DrawerDialogDemo>
          </div>
          
          <div className="flex flex-row">
            <div className="flex-1">
                <Controller
                  defaultValue = {''}
                  name="tag"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TagSelectComponent onClickChange={handleTag} value={field.value} />
                    }
                />
                {errors.tag?.message && <p className="text-xs text-red-500">{errors.tag?.message}</p>}
              </div>
              <DrawerDialogDemo drawerType={'TagList'} formType="Add Tag">
                <DialogTrigger asChild>
                  <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                    <Edit />
                  </div> 
                </DialogTrigger>
              </DrawerDialogDemo>
          </div>

            </div>
            <div>
          <Button
            disabled
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      <Controller
        name="startDate"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <div className=" border-white rounded py-1 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              month={date}
              onSelect={setDate}
              className=" border-white rounded py-1"
              captionLayout="dropdown" />
          </div>
      }
      />
        {errors.startDate?.message && <p className="text-xs text-red-500">{errors.startDate?.message}</p>}
      </div>
          </div>
      
        { !selectedInstallmentst?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
        
        { selectedInstallmentst?.title && <div className="flex gap-4">
          <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
          <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
        </div>}
      </form>
      </div>
    </div>
  );
}