import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto p-4 md:p-8 animate-fade-in">
          {children}
        </main>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};