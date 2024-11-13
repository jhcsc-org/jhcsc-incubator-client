import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, className }) => (
    <Card className={cn(`shadow-none`, className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

StatCard.displayName = "StatCard";

export default StatCard;
