
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

type RelayLabelDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialLabel: string
    onSave: (label: string) => void
}

export function RelayLabelDialog({ open, onOpenChange, initialLabel, onSave }: RelayLabelDialogProps) {
    const [label, setLabel] = useState(initialLabel)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Relay Label</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(label)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}