import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableWidgetProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const DraggableWidget = ({ id, children, className, title }: DraggableWidgetProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
        isDragging && "opacity-50",
        className
      )}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
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