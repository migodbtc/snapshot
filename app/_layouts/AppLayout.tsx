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
        items-center
        bg-slate-50 dark:bg-slate-950
    ">
        {/* Header */}
        <AppHeader />

        <div className='min-h-screen w-full flex justify-center'>
            {children}
        </div>

        {/* Footer */}
        <AppFooter />
    </div>
  )
}

export default AppLayout
