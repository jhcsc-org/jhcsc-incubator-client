
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    date: DateRange | undefined
    onDateChange: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onDateChange }: DateRangePickerProps) {
    const presets = [
        { label: "Last 24 Hours", days: 1 },
        { label: "Last 7 Days", days: 7 },
        { label: "Last 30 Days", days: 30 },
        { label: "Last 90 Days", days: 90 },
    ]

    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={onDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            <Select
                onValueChange={(value) => {
                    const days = parseInt(value)
                    const to = new Date()
                    const from = addDays(to, -days)
                    onDateChange({ from, to })
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                    {presets.map((preset) => (
                        <SelectItem key={preset.days} value={preset.days.toString()}>
                            {preset.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}