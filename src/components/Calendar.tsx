import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useState } from "react";

export const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg animate-fade-in">
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={(newDate) => setDate(newDate || new Date())}
        className="rounded-md"
      />
    </div>
  );
};