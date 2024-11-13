import { TCradleTelemetryData } from "@/types/cradle.types";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface TelemetryChartProps {
    data: TCradleTelemetryData[];
    dataKey: keyof TCradleTelemetryData;
    title: string;
    color: string;
}


const TelemetryChart: React.FC<TelemetryChartProps> = ({ data, dataKey, title, color }) => (
    <Card className="w-full h-96">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(value) => new Intl.DateTimeFormat('default', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(value))}
                        minTickGap={Math.max(75, Math.floor(100 / data.length))}
                    />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(value) => new Intl.DateTimeFormat('default', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }).format(new Date(value))}
                        formatter={(value) => [`${value}${dataKey === 'temperature' ? '°C' : '%'}`, title]}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

TelemetryChart.displayName = "TelemetryChart";

export default TelemetryChart;