import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PencilIcon } from "lucide-react"
import { useState } from "react"
import { RelayLabelDialog } from "./iot/shadow/relay-label-dialog"

type RelaySectionProps = {
    relayKey: string
    desired: {
        label: string
        state: boolean
    }
    reported: {
        label: string
        state: boolean
    }
    showReported: boolean
    onToggle: (state: boolean) => void
    onLabelChange?: (label: string) => void
    isOutOfSync: boolean
}

export function RelaySection({
    desired,
    reported,
    showReported,
    onToggle,
    onLabelChange,
    isOutOfSync
}: RelaySectionProps) {
    const [labelDialogOpen, setLabelDialogOpen] = useState(false)

    return (
        <>
            <Card className={isOutOfSync ? "border-yellow-500" : ""}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{desired.label}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setLabelDialogOpen(true)}
                        >
                            <PencilIcon className="w-4 h-4" />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Desired State</Label>
                        <Switch
                            checked={desired.state}
                            onCheckedChange={onToggle}
                        />
                    </div>

                    {showReported && (
                        <div className="flex items-center justify-between">
                            <Label>Reported State</Label>
                            <Switch
                                checked={reported.state}
                                disabled
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            <RelayLabelDialog
                open={labelDialogOpen}
                onOpenChange={setLabelDialogOpen}
                initialLabel={desired.label}
                onSave={(label) => {
                    onLabelChange?.(label)
                    setLabelDialogOpen(false)
                }}
            />
        </>
    )
}