"use client"

import type { TCradleTelemetryData } from '@/types/cradle.types'
import { format, subSeconds } from 'date-fns'
import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip
} from "@/components/ui/chart"
import { WifiOff } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

interface CombinedTelemetryChartProps {
    data: TCradleTelemetryData[];
    maxDataPoints?: number;
    timeWindow?: number;
}

const chartConfig = {
    temperature: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
        // @ts-expect-error: unit is optional in ChartConfig
        unit: "°C"
    },
    humidity: {
        label: "Humidity",
        color: "hsl(var(--chart-2))",
        // @ts-expect-error: unit is optional in ChartConfig
        unit: "%"
    },
} satisfies ChartConfig

const CombinedTelemetryChart: React.FC<CombinedTelemetryChartProps> = ({
    data,
    maxDataPoints = 60,
    timeWindow = 60
}) => {
    const filteredData = React.useMemo(() => {
        const cutoffTime = subSeconds(new Date(), timeWindow);
        return data
            .filter(point => new Date(point.timestamp) > cutoffTime)
            .slice(-maxDataPoints);
    }, [data, maxDataPoints, timeWindow]);

    const total = React.useMemo(() => ({
        temperature: filteredData.reduce((acc, curr) => acc + curr.temperature, 0) / filteredData.length,
        humidity: filteredData.reduce((acc, curr) => acc + curr.humidity, 0) / filteredData.length,
    }), [filteredData])

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
                <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Real-time Telemetry</CardTitle>
                    <CardDescription>
                        Combined temperature and humidity readings (Last 60 seconds)
                    </CardDescription>
                </div>
                <div className="flex">
                    {["temperature", "humidity"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={false}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[chart].toFixed(1)}{chartConfig[chart].unit}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={20}
                            tickFormatter={(time) => {
                                const now = Date.now();
                                const secondsAgo = Math.floor((now - new Date(time).getTime()) / 1000);
                                return `${secondsAgo}s ago`;
                            }}
                        />
                        <ChartTooltip
                            content={({ active, payload, label }) => {
                                if (!active || !payload) return null;
                                return (
                                    <div className="p-2 border rounded-lg shadow-lg bg-background">
                                        <p className="text-sm font-medium">
                                            {format(new Date(label), 'ss')}s
                                        </p>
                                        {payload.map((entry) => (
                                            <p
                                                key={entry.dataKey}
                                                className="text-sm"
                                                style={{ color: chartConfig[entry.dataKey as keyof typeof chartConfig].color }}
                                            >
                                                {chartConfig[entry.dataKey as keyof typeof chartConfig].label}:&nbsp;
                                                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value ?? 'N/A'}
                                                {chartConfig[entry.dataKey as keyof typeof chartConfig].unit}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                        <Line
                            dataKey="temperature"
                            type="linear"
                            stroke={chartConfig.temperature.color}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                            animationEasing='ease-in-out'
                        />
                        <Line
                            dataKey="humidity"
                            type="linear"
                            stroke={chartConfig.humidity.color}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

const RealTimeTelemetryChart: React.FC<{ latestData: TCradleTelemetryData }> = ({ latestData }) => {
    const [telemetryData, setTelemetryData] = React.useState<TCradleTelemetryData[]>([]);

    React.useEffect(() => {
        console.log("Latest Data: ", latestData); // Log latestData
        setTelemetryData(prev => {
            const newData = [...prev, latestData];
            const cutoffTime = subSeconds(new Date(), 60);
            console.log("Cutoff Time: ", cutoffTime); // Log cutoffTime
            const filteredData = newData.filter(point => {
                const pointTime = new Date(point.timestamp);
                console.log("Point Time: ", pointTime); // Log each point's timestamp
                return pointTime > cutoffTime;
            });
            console.log("Filtered Data: ", filteredData); // Log filteredData
            return filteredData;
        });
    }, [latestData]);

    return (
        <React.Fragment>
            {telemetryData.length > 0 ? (
                <CombinedTelemetryChart data={telemetryData} />
            ) : (
                <RealTimeTelemetrySkeleton />
            )}
        </React.Fragment>
    );
};

const RealTimeTelemetrySkeleton: React.FC = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
                <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Real-time Telemetry</CardTitle>
                    <CardDescription>
                        Combined temperature and humidity readings (Last 60 seconds)
                    </CardDescription>
                </div>
                <div className="flex">
                    {["temperature", "humidity"].map((key) => (
                        <div
                            key={key}
                            className="flex flex-col justify-center flex-1 gap-1 px-6 py-4 text-left border-t even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        >
                            <span className="text-xs text-muted-foreground">
                                {chartConfig[key as keyof typeof chartConfig].label}
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                --
                            </span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <Skeleton className="aspect-auto h-[250px] animate-none text-muted-foreground flex flex-col justify-center items-center gap-2">
                    <WifiOff />
                    <p className='text-sm'>
                        Device Offline
                    </p>
                </Skeleton>
            </CardContent>
        </Card>
    );
};

export default RealTimeTelemetryChart;