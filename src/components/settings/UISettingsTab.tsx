import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Settings } from '@/types/types';
import { ColorPicker } from './ColorPicker';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface UISettingsTabProps {
  settings: Settings;
  onSettingChange: (key: keyof Settings, value: any) => void;
}

export const UISettingsTab = ({ settings, onSettingChange }: UISettingsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Card Styling</Label>
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Text Color</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Choose a contrasting color for better readability
                </TooltipContent>
              </Tooltip>
            </div>
            <ColorPicker
              color={settings.cardTextColor || '#ffffff'}
              onChange={(color) => onSettingChange('cardTextColor', color)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Border Color</Label>
            </div>
            <ColorPicker
              color={settings.cardBorderColor || '#333333'}
              onChange={(color) => onSettingChange('cardBorderColor', color)}
            />
          </div>

          <div className="space-y-2">
            <Label>Border Style</Label>
            <RadioGroup
              value={settings.cardBorderStyle || 'solid'}
              onValueChange={(value) => onSettingChange('cardBorderStyle', value)}
              className="grid grid-cols-2 gap-2"
            >
              {['solid', 'dashed', 'dotted', 'none'].map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <RadioGroupItem value={style} id={style} />
                  <Label htmlFor={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Background Color</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Choose a color that contrasts well with your text color
                </TooltipContent>
              </Tooltip>
            </div>
            <ColorPicker
              color={settings.cardBackgroundColor || '#1a1a1a'}
              onChange={(color) => onSettingChange('cardBackgroundColor', color)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Background Image URL</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Supported formats: .jpg, .png, .webp (max 2MB recommended)
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="url"
              placeholder="Enter image URL"
              value={settings.cardBackgroundImage || ''}
              onChange={(e) => onSettingChange('cardBackgroundImage', e.target.value)}
              className="w-full"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};