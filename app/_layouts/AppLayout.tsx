import React from "react";
import AppHeader from "../_components/AppHeader";
import { AppFooter } from "../_components/AppFooter";

type AppLayoutProps = {
  children: React.ReactNode;
};

// Dedicated AppLayout for reusability throughout the other features and stuff
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div
      className="
        relative flex flex-col flex-1 
        min-h-screen
        items-center
        overflow-hidden
        bg-slate-50 dark:bg-slate-950
    "
    >
      {/* Header */}
      <AppHeader />

      <div className="relative w-full h-auto flex justify-center text-slate-950 dark:text-slate-50">
        {/* Decorative Gradients */}
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none blur-3xl animate-pulse [animation-duration:15s]">
          <div className="absolute -top-20 -left-40 w-108 h-108 rounded-full bg-rose-300/30 dark:bg-rose-800/20" />
          <div className="absolute top-2/3 -right-20 w-144 h-144 rounded-full bg-pink-300/30 dark:bg-pink-800/20" />
        </div>
        {/* Children */}
        <div className="relative z-20 w-full flex justify-center">
          {children}
        </div>
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  );
};

export default AppLayout;
