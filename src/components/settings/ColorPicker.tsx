import { ChromePicker } from 'react-color';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker = ({ color, onChange, className }: ColorPickerProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings2 className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setShowColorPicker(!showColorPicker)}>
            Change Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showColorPicker && (
        <div className="absolute right-0 top-12 z-50">
          <ChromePicker
            color={color}
            onChange={(color) => onChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)}
          />
        </div>
      )}
    </div>
  );
};