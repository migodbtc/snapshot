import AppLayout from "../_layouts/AppLayout"

type AboutLayoutProps = {
    children: React.ReactNode
}

export default function AboutLayout({ children }: AboutLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}