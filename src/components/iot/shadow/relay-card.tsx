import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { TCradleShadowRelayStatus } from '@/types/cradle.types';
import { Power } from 'lucide-react';
import React from 'react';

interface RelayCardProps {
    relay: TCradleShadowRelayStatus;
    isDesired: boolean;
    onToggle?: (newState: boolean) => void;
}

export const RelayCard: React.FC<RelayCardProps> = ({
    relay,
    isDesired,
    onToggle,
}) => {
    return (
        <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                    {relay.label.charAt(0).toUpperCase() + relay.label.slice(1)}
                </CardTitle>
                <Badge variant={isDesired ? "default" : "secondary"}>
                    {isDesired ? "Desired" : "Reported"}
                </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Power className={`h-4 w-4 ${relay.state ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">
                        {relay.state ? 'ON' : 'OFF'}
                    </span>
                </div>
                {isDesired && onToggle && (
                    <Switch
                        checked={relay.state}
                        onCheckedChange={onToggle}
                    />
                )}
            </CardContent>
        </Card>
    );
};