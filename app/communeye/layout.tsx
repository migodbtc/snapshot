import AppLayout from "../_layouts/AppLayout"

type CommuneyeLayoutProps = {
    children: React.ReactNode
}

export default function CommuneyeLayout({ children }: CommuneyeLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}