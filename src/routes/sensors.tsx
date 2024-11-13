import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/iot/data-table-column-header';
import { DateRangePicker } from "@/components/iot/date-range-picker";
import StatCard from '@/components/iot/stats-card';
import { TelemetryChart } from "@/components/iot/telemetry-chart";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateStats, telemetryQueryOptions } from '@/data/telemetry';
import { cn, sub24Hours } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { Schema } from 'amplify/data/resource';
import { ArrowDown, ArrowUp, Download, Droplets, GaugeCircle, RefreshCcw, Thermometer } from 'lucide-react';
import React, { Suspense } from 'react';
import { DateRange } from "react-day-picker";

type TelemetryItem = Pick<Schema['Telemetry']['type'], 'temperature' | 'humidity' | 'timestamp'>;

const columns: ColumnDef<TelemetryItem>[] = [
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => new Date(row.getValue('timestamp')).toLocaleString(),
  },
  {
    accessorKey: 'temperature',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Temperature" />
    ),
    cell: ({ row }) => `${row.getValue('temperature')}°C`,
  },
  {
    accessorKey: 'humidity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Humidity" />
    ),
    cell: ({ row }) => `${row.getValue('humidity')}%`,
  },
]

export const Route = createFileRoute('/sensors')({
  loader: (opts) => opts.context.queryClient.ensureQueryData(telemetryQueryOptions()),
  component: RouteComponent,
})

function TelemetryData() {
  const [dateRange, setDateRange] = React.useState<DateRange>()
  const telemetryQuery = useSuspenseQuery(telemetryQueryOptions(dateRange))
  const telemetryData = React.useMemo(() => telemetryQuery.data ?? [], [telemetryQuery.data]);

  const temperatureStats = calculateStats(telemetryData.map(d => d.temperature ?? undefined));
  const humidityStats = calculateStats(telemetryData.map(d => d.humidity ?? undefined));

  const last24Hours = React.useMemo(() => {
    const cutoff = sub24Hours(new Date());
    return telemetryData.filter(d => new Date(d.timestamp) >= cutoff);
  }, [telemetryData]);

  const handleExport = () => {
    const csv = [
      ['Time', 'Temperature (°C)', 'Humidity (%)'],
      ...telemetryData.map(row => [
        new Date(row.timestamp).toLocaleString(),
        row.temperature,
        row.humidity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => telemetryQuery.refetch()}
              disabled={telemetryQuery.isFetching}
            >
              <RefreshCcw className={cn("w-4 h-4", {
                "animate-spin": telemetryQuery.isFetching
              })} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Temperature</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Current"
              value={`${temperatureStats?.latest ?? '--'}°C`}
              description="Latest reading"
              icon={<Thermometer className="w-4 h-4 text-blue-500" />}
            />
            <StatCard
              title="Average"
              value={`${temperatureStats?.average ?? '--'}°C`}
              description="Average temperature"
              icon={<GaugeCircle className="w-4 h-4 text-blue-500" />}
            />
            <StatCard
              title="Minimum"
              value={`${temperatureStats?.min ?? '--'}°C`}
              description="Lowest reading"
              icon={<ArrowDown className="w-4 h-4 text-blue-500" />}
            />
            <StatCard
              title="Maximum"
              value={`${temperatureStats?.max ?? '--'}°C`}
              description="Highest reading"
              icon={<ArrowUp className="w-4 h-4 text-blue-500" />}
            />
          </div>
        </div>
        {/* Stats */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Humidity</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Current"
              value={`${humidityStats?.latest ?? '--'}%`}
              description="Latest reading"
              icon={<Droplets className="w-4 h-4 text-green-500" />}
            />
            <StatCard
              title="Average"
              value={`${humidityStats?.average ?? '--'}%`}
              description="Average humidity"
              icon={<GaugeCircle className="w-4 h-4 text-green-500" />}
            />
            <StatCard
              title="Minimum"
              value={`${humidityStats?.min ?? '--'}%`}
              description="Lowest reading"
              icon={<ArrowDown className="w-4 h-4 text-green-500" />}
            />
            <StatCard
              title="Maximum"
              value={`${humidityStats?.max ?? '--'}%`}
              description="Highest reading"
              icon={<ArrowUp className="w-4 h-4 text-green-500" />}
            />
          </div>
        </div>
        {/* Overview Chart */}
        <Card className="p-4">
          <h2 className="mb-4 text-lg font-semibold">Overview</h2>
          <TelemetryChart data={telemetryData.map(d => ({
            timestamp: d.timestamp,
            temperature: d.temperature ?? undefined,
            humidity: d.humidity ?? undefined
          }))} />
        </Card>

        {/* 24h Detail Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Temperature (Last 24h)</h2>
            <TelemetryChart
              data={last24Hours.map(d => ({
                timestamp: d.timestamp,
                temperature: d.temperature ?? undefined,
                humidity: d.humidity ?? undefined
              }))}
              showOnlyTemperature
              height={300}
            />
          </Card>
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Humidity (Last 24h)</h2>
            <TelemetryChart
              data={last24Hours.map(d => ({
                timestamp: d.timestamp,
                temperature: d.temperature ?? undefined,
                humidity: d.humidity ?? undefined
              }))}
              showOnlyHumidity
              height={300}
            />
          </Card>
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-semibold">Telemetry Log</h2>
        <DataTable
          columns={columns}
          data={telemetryData}
        />
      </div>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-[400px] w-full bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(8).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  )
}

function DelayedSkeleton() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200) // 200ms delay
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  return <LoadingSkeleton />
}

function RouteComponent() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<DelayedSkeleton />}>
        <TelemetryData />
      </Suspense>
    </div>
  )
}