import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useState } from "react";

export const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="p-dynamic-4 bg-white/10 backdrop-blur-sm rounded-lg animate-fade-in w-full max-w-full overflow-auto">
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={(newDate) => setDate(newDate || new Date())}
        className="rounded-md w-full scale-[0.85] sm:scale-100 transform-origin-top-left"
      />
    </div>
  );
};