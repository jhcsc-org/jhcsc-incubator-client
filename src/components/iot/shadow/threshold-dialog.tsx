
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type ThresholdDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialValues: {
        temperatureHigh: number
        temperatureLow: number
        humidity: number
    }
    onSave: (values: {
        temperatureHigh: number
        temperatureLow: number
        humidity: number
    }) => void
}

export function ThresholdDialog({ open, onOpenChange, initialValues, onSave }: ThresholdDialogProps) {
    const [values, setValues] = useState(initialValues)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adjust Thresholds</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="tempHigh">High Temp</Label>
                        <Input
                            id="tempHigh"
                            type="number"
                            value={values.temperatureHigh}
                            onChange={(e) => setValues(prev => ({
                                ...prev,
                                temperatureHigh: Number(e.target.value)
                            }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="tempLow">Low Temp</Label>
                        <Input
                            id="tempLow"
                            type="number"
                            value={values.temperatureLow}
                            onChange={(e) => setValues(prev => ({
                                ...prev,
                                temperatureLow: Number(e.target.value)
                            }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="humidity">Humidity</Label>
                        <Input
                            id="humidity"
                            type="number"
                            value={values.humidity}
                            onChange={(e) => setValues(prev => ({
                                ...prev,
                                humidity: Number(e.target.value)
                            }))}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(values)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}