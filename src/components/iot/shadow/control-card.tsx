import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface AutoControlCardProps {
    isEnabled: boolean;
    isDesired: boolean;
    onToggle?: (newState: boolean) => void;
}

export const AutoControlCard: React.FC<AutoControlCardProps> = ({
    isEnabled,
    isDesired,
    onToggle,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                    Auto Control
                    <Badge variant={isDesired ? "default" : "secondary"}>
                        {isDesired ? "Desired" : "Reported"}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                    <Switch
                        checked={isEnabled}
                        onCheckedChange={isDesired && onToggle ? onToggle : undefined}
                        disabled={!isDesired}
                    />
                    <span className="text-sm">
                        {isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};