import AppLayout from "../_layouts/AppLayout"

type EducationLayoutProps = {
    children: React.ReactNode
}

export default function EducationLayout({ children }: EducationLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}