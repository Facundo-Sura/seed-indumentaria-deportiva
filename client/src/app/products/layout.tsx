import Sidebar from "@/ui/products/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full flex-none md:w-52">
                <Sidebar />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}