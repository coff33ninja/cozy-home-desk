import { ChromePicker } from 'react-color';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, Check } from 'lucide-react';
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
  const [tempColor, setTempColor] = useState(color);

  const handleColorChange = (color: any) => {
    // Convert to solid color by setting alpha to 1
    const { r, g, b } = color.rgb;
    setTempColor(`rgb(${r}, ${g}, ${b})`);
  };

  const handleApplyColor = () => {
    onChange(tempColor);
    setShowColorPicker(false);
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="bg-background">
            <Settings2 className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background border-none">
          <DropdownMenuItem onSelect={() => setShowColorPicker(!showColorPicker)} className="bg-background">
            Change Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showColorPicker && (
        <div className="absolute right-0 top-12 z-50">
          <div className="relative bg-background rounded-lg shadow-lg">
            <ChromePicker 
              color={tempColor}
              onChange={handleColorChange}
              disableAlpha={true} // Disable transparency
            />
            <Button
              className="absolute -bottom-8 right-0 mt-2"
              size="sm"
              onClick={handleApplyColor}
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};