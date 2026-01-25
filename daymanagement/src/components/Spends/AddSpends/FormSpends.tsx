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
  income?: boolean
  date: string,
  incomeAmount?: string
  numberOfProduct?: string
  priceOfProduct?: string
  category: string
  tag: string
}

export default function FormSpends({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [date, setDate] = useState<Date>()
  
// creating a schema for strings 
   const formSchema = z.object({
    title: z.string().min(4, { message: 'Name is required' }),
    income: z.boolean().optional(),
    numberOfProduct: z.string().optional(),
    priceOfProduct: z.string().optional(),
    incomeAmount: z.string().min(1, { message: 'incomeAmount is required' }).optional(),
    category: z.string().min(1, { message: 'Category is required' }),
    tag: z.string().min(1, { message: 'Tag is required' }),
    date: z.string().min(1, { message: 'date is required' }),
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
     date && setValue("date", Math.floor(new Date(date).getTime()/1000.0).toString())
  }, [date])
  
  const dispatch = useAppDispatch();
  const { selectedSpends } : any = useAppSelector((state) => state.SpendsList) || {};
  
  useEffect(() => {
    if (selectedSpends) {
      setValue("title", selectedSpends?.title)
      setValue("income", selectedSpends.income)
      setValue("numberOfProduct", selectedSpends.numberOfProduct)
      setValue("priceOfProduct", selectedSpends.priceOfProduct)
      setValue("incomeAmount", selectedSpends.incomeAmount)
      setValue("category", selectedSpends.category)
      setValue("tag", selectedSpends.tag)
      setValue("date", selectedSpends.date)
      setDate(new Date(Number(selectedSpends.date) * 1000))
    }
  }, [selectedSpends, setValue])
  
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
    
    selectedSpends?.title ? dispatch(updateSpendsList(
      {
        id: selectedSpends.id,
        title: data.title,
        income: data.income || false,
        date: date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        numberOfProduct: data.numberOfProduct || "",
        priceOfProduct: data.priceOfProduct || "",
        incomeAmount: data.incomeAmount || "",
        category: data.category,
        tag: data.tag
      })) :
      dispatch(setSpendsList({
        id: "",
        title: data.title,
        income: data.income || false,
        date: date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        numberOfProduct: data.numberOfProduct || "",
        priceOfProduct: data.priceOfProduct || "",
        incomeAmount: data.incomeAmount || "",
        category: data.category,
        tag: data.tag
      }))
    dispatch(selectSpendsList(""))
    setValue("date", "")
    reset()
    onSubmitForm()
  };

  const onReset = () => {
    dispatch(selectSpendsList(""))
      setValue("date", "")
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
              
              <span>{ `${watch("income")}`}</span>
              <Controller
                name="income"
                control={control}
                render={({ field }) =>
                  <BasicSwitch 
                    checked={!!field.value}
                    handleToggle={() =>
                      {
                        console.log(!field.value);
                      
                        // field.onChange(!field.value as boolean)
                        setValue("income", !field.value)
                      }
                    }
                    label=""
                    key={"income"}
                  />
              }
              />
              {!watch("income") && <div>
              <Controller
                defaultValue = {''}
                name="numberOfProduct"
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
            {errors.numberOfProduct?.message && <p className="text-xs text-red-500">{errors.numberOfProduct?.message}</p>}
              
              <Controller
                defaultValue = {''}
                name="priceOfProduct"
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
            {errors.priceOfProduct?.message && <p className="text-xs text-red-500">{errors.priceOfProduct?.message}</p>}
              </div>}


             {watch("income") &&  <Controller
                defaultValue = {''}
                name="incomeAmount"
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
            {watch("income") && errors.incomeAmount?.message && <p className="text-xs text-red-500">{errors.incomeAmount?.message}</p>}


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
        name="date"
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
        {errors.date?.message && <p className="text-xs text-red-500">{errors.date?.message}</p>}
      </div>
          </div>
      
        { !selectedSpends?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
        
        { selectedSpends?.title && <div className="flex gap-4">
          <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
          <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
        </div>}
      </form>
      </div>
    </div>
  );
}