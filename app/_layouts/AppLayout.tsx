import React from "react";
import AppHeader from "../_components/AppHeader";
import { AppFooter } from "../_components/AppFooter";

type AppLayoutProps = {
  children: React.ReactNode;
  headerless?: boolean;
};

// Dedicated AppLayout for reusability throughout the other features and stuff
const AppLayout = ({ children, headerless }: AppLayoutProps) => {
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
      {headerless && <AppHeader />}

      <div className="relative w-full h-auto flex justify-center text-slate-950 dark:text-slate-50">
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
