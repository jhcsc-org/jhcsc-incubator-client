import { cn } from "@/lib/utils"
import { Construction } from "lucide-react"
import * as React from "react"

interface UnderConstructionProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    message?: string
}

export default function UnderConstruction({
    title = "Under Construction",
    message = "This page is currently under construction. Please check back later.",
    className,
    ...props
}: UnderConstructionProps) {
    return (
        <div
            className={cn(
                "flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border bg-muted/10 p-8 text-center",
                className
            )}
            {...props}
        >
            <Construction className="size-12 animate-pulse text-muted-foreground" />
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    )
}