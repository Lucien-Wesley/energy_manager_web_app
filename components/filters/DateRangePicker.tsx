"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: [Date, Date];
  onDateRangeChange: (dateRange: [Date, Date]) => void;
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateRange[0],
    to: dateRange[1],
  });

  // Update when the external date range changes
  useEffect(() => {
    setDate({
      from: dateRange[0],
      to: dateRange[1],
    });
  }, [dateRange]);

  // Predefined date ranges
  const selectLastWeek = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const newRange: [Date, Date] = [lastWeek, today];
    onDateRangeChange(newRange);
  };

  const selectLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);
    const newRange: [Date, Date] = [lastMonth, today];
    onDateRangeChange(newRange);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={selectLastWeek}
        >
          Last Week
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={selectLastMonth}
        >
          Last Month
        </Button>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[240px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              if (selectedDate?.from && selectedDate.to) {
                onDateRangeChange([selectedDate.from, selectedDate.to]);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}