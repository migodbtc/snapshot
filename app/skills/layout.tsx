import AppLayout from "../_layouts/AppLayout"

type SkillsLayoutProps = {
    children: React.ReactNode
}

export default function SkillsLayout({ children }: SkillsLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}