import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TCradleShadowEnvironmentalThresholds } from '@/types/cradle.types';
import { useState } from "react";
import { ThresholdDialog } from "./threshold-dialog";

type ThresholdsCardProps = {
    thresholds: TCradleShadowEnvironmentalThresholds;
    isDesired: boolean;
    onUpdate?: (field: keyof TCradleShadowEnvironmentalThresholds, value: number) => void;
};

export function ThresholdsCard({ thresholds, isDesired, onUpdate }: ThresholdsCardProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{isDesired ? 'Desired' : 'Reported'} Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <span>Temperature High: {thresholds.temperatureHigh}°C</span>
                        <span>Temperature Low: {thresholds.temperatureLow}°C</span>
                        <span>Humidity: {thresholds.humidity}%</span>
                    </div>
                    {isDesired && (
                        <Button onClick={() => setDialogOpen(true)}>
                            Adjust Thresholds
                        </Button>
                    )}
                </div>

                {isDesired && (
                    <ThresholdDialog
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        initialValues={thresholds}
                        onSave={(values) => {
                            Object.entries(values).forEach(([key, value]) => {
                                onUpdate?.(key as keyof TCradleShadowEnvironmentalThresholds, value);
                            });
                            setDialogOpen(false);
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
}