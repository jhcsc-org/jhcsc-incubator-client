import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useFileRoute } from "@/hooks/useBreadcrumb"
import { Separator } from "@radix-ui/react-separator"
import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

export default function Layout({ children }: { children: React.ReactNode }) {
    const breadcrumb = useFileRoute();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center h-16 gap-2 shrink-0">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-4 mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Incubator
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                {breadcrumb.segments.map((segment, index) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">
                                                {segment}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </React.Fragment>
                                ))}
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {breadcrumb.current}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
                    <div className="flex-1 rounded-xl md:min-h-min">
                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
