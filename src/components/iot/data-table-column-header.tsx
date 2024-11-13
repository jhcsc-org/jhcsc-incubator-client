
import { Button } from "@/components/ui/button"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div>{title}</div>
    }

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4 ml-2" />
            ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4 ml-2" />
            ) : (
                <ArrowUpDown className="w-4 h-4 ml-2" />
            )}
        </Button>
    )
}