import React from 'react'
import AppHeader from '../_components/AppHeader'
import { AppFooter } from '../_components/AppFooter'

type AppLayoutProps = {
    children: React.ReactNode
}

// Dedicated AppLayout for reusability throughout the other features and stuff
const AppLayout = (
    {
        children
    } : AppLayoutProps
) => {
  return (
    <div className="
        flex flex-col flex-1 
        min-h-screen
        items-center
        bg-slate-50 dark:bg-slate-950
    ">
        {/* Header */}
        <AppHeader />

        <div className='w-full h-auto flex justify-center text-slate-950 dark:text-slate-50'>
            {children}
        </div>

        {/* Footer */}
        <AppFooter />
    </div>
  )
}

export default AppLayout
