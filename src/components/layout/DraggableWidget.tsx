import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetSize } from "@/types/types";
import { Button } from "../ui/button";
import { getSettings, updateSettings } from "@/lib/localStorage";

interface DraggableWidgetProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const DraggableWidget = ({ id, children, className, title }: DraggableWidgetProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const settings = getSettings();
  const [size, setSize] = useState<WidgetSize>(
    settings.layout?.widgetSizes[id] || 'medium'
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const handleSizeChange = (newSize: WidgetSize) => {
    setSize(newSize);
    const newSettings = {
      ...settings,
      layout: {
        ...settings.layout,
        widgetSizes: {
          ...settings.layout?.widgetSizes,
          [id]: newSize
        }
      }
    };
    updateSettings(newSettings);
  };

  const sizeClasses = {
    small: 'w-full md:w-1/2 lg:w-1/3',
    medium: 'w-full md:w-2/3 lg:w-1/2',
    large: 'w-full md:w-full lg:w-2/3',
    full: 'w-full'
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-dark-card rounded-lg transition-all duration-200",
        sizeClasses[size],
        isDragging && "opacity-50",
        className
      )}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSizeChange(size === 'full' ? 'medium' : 'full')}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {size === 'full' ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>
      
      {title && (
        <div className="px-4 py-2 font-semibold border-b border-dark-border">
          {title}
        </div>
      )}
      
      <div className={cn(
        "transition-all duration-200",
        isCollapsed ? "h-0 overflow-hidden" : "h-auto"
      )}>
        {children}
      </div>
    </div>
  );
};