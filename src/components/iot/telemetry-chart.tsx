import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TelemetryChartProps {
    data: Array<{
        timestamp: string;
        temperature?: number;
        humidity?: number;
    }>;
    showOnlyTemperature?: boolean;
    showOnlyHumidity?: boolean;
    height?: number;
}

export function TelemetryChart({
    data,
    showOnlyTemperature,
    showOnlyHumidity,
    height = 400
}: TelemetryChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => format(new Date(value), "HH:mm:ss")}
                    interval="preserveStartEnd"
                />
                {(!showOnlyHumidity) && (
                    <YAxis
                        yAxisId="temperature"
                        orientation={showOnlyTemperature ? "right" : "left"}
                        tickFormatter={(value) => `${value}°C`}
                        domain={['auto', 'auto']}
                    />
                )}
                {(!showOnlyTemperature) && (
                    <YAxis
                        yAxisId="humidity"
                        orientation="right"
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 100]}
                    />
                )}
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <Card className="p-2 shadow-md bg-background/95">
                                    <p className="text-sm font-medium">
                                        {format(new Date(label), "PPpp")}
                                    </p>
                                    {payload.map((entry, index) => (
                                        <p key={index} style={{ color: entry.color }}>
                                            {entry.name === 'temperature'
                                                ? `Temperature: ${entry.value}°C`
                                                : `Humidity: ${entry.value}%`}
                                        </p>
                                    ))}
                                </Card>
                            );
                        }
                        return null;
                    }}
                />
                <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                />
                {(!showOnlyHumidity) && (
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#3b82f6"
                        yAxisId="temperature"
                        name="Temperature"
                        dot={false}
                        strokeWidth={2}
                    />
                )}
                {(!showOnlyTemperature) && (
                    <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#22c55e"
                        yAxisId="humidity"
                        name="Humidity"
                        dot={false}
                        strokeWidth={2}
                    />
                )}
                {/* Only show brush in overview chart */}
                {(!showOnlyTemperature && !showOnlyHumidity) && (
                    <Brush
                        dataKey="timestamp"
                        height={30}
                        stroke="#666"
                        tickFormatter={(value) => format(new Date(value), "HH:mm")}
                    />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
}