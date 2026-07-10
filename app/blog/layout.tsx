import AppLayout from "../_layouts/AppLayout"

type BlogLayoutProps = {
    children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return <AppLayout>
        {children}
    </AppLayout>
}