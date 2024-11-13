
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
    className?: string
}

export function DataTablePagination<TData>({
    table,
    className,
}: DataTablePaginationProps<TData>) {
    return (
        <div className={cn("flex items-center justify-between px-2", className)}>
            <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}