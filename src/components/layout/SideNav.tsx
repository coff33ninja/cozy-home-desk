import { Link, useLocation } from "react-router-dom";
import { Home, Film, Settings, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const SideNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Film, path: "/arr-manager", label: "Media Manager" },
    { icon: Calendar, path: "/calendar", label: "Calendar" },
    { icon: Clock, path: "/clock", label: "Clock" },
  ];

  return (
    <nav className="hidden md:flex flex-col gap-2 p-4 border-r border-dark-border bg-dark-card min-h-screen w-16 fixed left-0 top-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "p-3 rounded-lg hover:bg-white/10 transition-colors",
              location.pathname === item.path && "bg-white/10"
            )}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </nav>
  );
};