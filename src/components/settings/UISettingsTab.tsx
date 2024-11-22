import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Settings } from '@/types/types';
import { ColorPicker } from './ColorPicker';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

interface UISettingsTabProps {
  settings: Settings;
  onSettingChange: (key: keyof Settings, value: any) => void;
}

export const UISettingsTab = ({ settings, onSettingChange }: UISettingsTabProps) => {
  const handleThemeChange = (key: keyof Settings['theme'], value: any) => {
    onSettingChange('theme', { ...settings.theme, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Theme Colors</Label>
          <Switch
            checked={settings.theme.glassEffect}
            onCheckedChange={(checked) => handleThemeChange('glassEffect', checked)}
          />
          <Label>Glass Effect</Label>
        </div>

        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <ColorPicker
              color={settings.theme.primaryColor}
              onChange={(color) => handleThemeChange('primaryColor', color)}
            />
          </div>

          <div className="space-y-2">
            <Label>Secondary Color</Label>
            <ColorPicker
              color={settings.theme.secondaryColor}
              onChange={(color) => handleThemeChange('secondaryColor', color)}
            />
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <ColorPicker
              color={settings.theme.accentColor}
              onChange={(color) => handleThemeChange('accentColor', color)}
            />
          </div>
        </Card>

        <Separator />

        <Label>Card Styling</Label>
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Border Radius</Label>
            </div>
            <RadioGroup
              value={settings.theme.borderRadius}
              onValueChange={(value) => handleThemeChange('borderRadius', value)}
              className="grid grid-cols-2 gap-2"
            >
              {['none', 'small', 'medium', 'large'].map((radius) => (
                <div key={radius} className="flex items-center space-x-2">
                  <RadioGroupItem value={radius} id={radius} />
                  <Label htmlFor={radius}>{radius.charAt(0).toUpperCase() + radius.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

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
              color={settings.theme.cardTextColor}
              onChange={(color) => handleThemeChange('cardTextColor', color)}
            />
          </div>

          <div className="space-y-2">
            <Label>Border Style</Label>
            <RadioGroup
              value={settings.theme.cardBorderStyle}
              onValueChange={(value) => handleThemeChange('cardBorderStyle', value)}
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
              color={settings.theme.cardBackgroundColor}
              onChange={(color) => handleThemeChange('cardBackgroundColor', color)}
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
              value={settings.theme.cardBackgroundImage || ''}
              onChange={(e) => handleThemeChange('cardBackgroundImage', e.target.value)}
              className="w-full"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};