import React from 'react';
import { ChromePicker } from 'react-color';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full h-10 rounded-md border border-input flex items-center justify-between px-3"
          style={{ backgroundColor: color }}
        >
          <span className="text-xs text-white shadow-sm">{color}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none">
        <ChromePicker
          color={color}
          onChange={(color) => onChange(color.hex)}
          disableAlpha={false}
        />
      </PopoverContent>
    </Popover>
  );
};