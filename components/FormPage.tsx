"use client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Label } from "./ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { createMeeting } from "@/utils/actions";

const FormPage = () => {
  const searchParams = useSearchParams();
  const roomName = searchParams.get("name");
  const price = searchParams.get("price");
  const capacity = Number(searchParams.get("capacity"));
  const user = useUser();
  const emailUser = user.user?.emailAddresses[0].emailAddress;

  const [selectedValue, setSelectedValue] = useState("0");
  const [calendarDate, setCalendarDate] = useState(undefined);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    guestEmails: z.array(
      z.string().email({ message: "Invalid email address" }),
    ),
    date: z.date(),
    time: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      guestEmails: [],
      date: undefined,
      time: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.date && values.time) {
      // Parse the time value to an integer and set it as the hour of the date.
      values.date.setHours(parseInt(values.time));
    }
    const participants = values.guestEmails.map((email) => ({ email }));
    try {
       await createMeeting({
        title: values.title,
        room: roomName ? roomName : "",
        description: values.description,
        startTime: values.date,
        participants: emailUser
          ? [...participants, { email: emailUser }]
          : participants,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex w-full flex-col items-center p-2">
      <h1 className="my-12 text-center text-3xl">{roomName} Reservation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of the room" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of the reservation"
                    className="resize-none"
                    maxLength={150}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {capacity && capacity > 1 && (
            <div className="flex flex-col gap-1">
              <Label htmlFor="guests">Number of guests</Label>
              <Select
                name="guests"
                onValueChange={handleValueChange}
                value={selectedValue}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Number of guests">
                    {selectedValue === "0" ? "No guests" : selectedValue}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[...Array(capacity)].map((_, index) => (
                    <SelectItem key={index} value={String(index)}>
                      {index}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {Number(selectedValue) > 0 && (
            <div className="flex flex-col gap-1">
              <Label htmlFor="guestsEmail">Guests</Label>
              {Array.from({ length: Number(selectedValue) }, (_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`guestEmails.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`guest${index + 1}@email`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of reservation</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setCalendarDate(date);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          {calendarDate && (
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose a time</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="14" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          14:00 - 15:00
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="15" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          15:00 - 16:00
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="16" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          16:00 - 17:00
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default FormPage;
