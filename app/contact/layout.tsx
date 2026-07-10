import AppLayout from "../_layouts/AppLayout"

type ContactLayoutProps = {
    children: React.ReactNode
}

export default function ContactLayout({ children }: ContactLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}