import AppLayout from "../_layouts/AppLayout"

type ExperienceLayoutProps = {
    children: React.ReactNode
}

export default function ExperienceLayout({ children }: ExperienceLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}