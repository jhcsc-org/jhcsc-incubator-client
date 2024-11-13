import TelemetryChart from '@/components/charts/telemetry-chart'
import RealTimeTelemetryChart from '@/components/charts/telemetry-chart-combined'
import StatCard from '@/components/iot/stats-card'
import { calculateStats, telemetryQueryOptions } from '@/data/telemetry'
import { useDeviceOnlineStatus } from '@/hooks/useStatus'
import { useSubscribe } from '@/hooks/useSubscribe'
import { TOPICS } from '@/lib/constants'
import { sub24Hours } from '@/lib/utils'
import { TCradleShadowDeviceShadowState, TCradleTelemetryData } from '@/types/cradle.types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Clock, Droplets, Power, Thermometer, Wifi, WifiOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  loader: (opts) => opts.context.queryClient.ensureQueryData(telemetryQueryOptions()),
  component: Index,
})

function Index() {
  const [relay1State, setRelay1State] = useState(false)
  const [relay2State, setRelay2State] = useState(false)

  const telemetryQuery = useSuspenseQuery(telemetryQueryOptions())
  const historicalData = React.useMemo(() =>
    (telemetryQuery.data ?? []).map(d => ({
      timestamp: d.timestamp,
      temperature: d.temperature ?? 0,
      humidity: d.humidity ?? 0
    })), [telemetryQuery.data])

  // Calculate last 24h stats
  const last24Hours = React.useMemo(() => {
    const cutoff = sub24Hours(new Date())
    return historicalData.filter(d => new Date(d.timestamp) >= cutoff)
  }, [historicalData])

  const last24HoursTempStats = calculateStats(last24Hours.map(d => d.temperature ?? undefined))
  const last24HoursHumidityStats = calculateStats(last24Hours.map(d => d.humidity ?? undefined))

  const isOnline = useDeviceOnlineStatus(TOPICS.telemetry.topic)
  const { message: latestTelemetry } = useSubscribe<TCradleTelemetryData>(TOPICS.telemetry.topic)
  const { message: shadowState } = useSubscribe<TCradleShadowDeviceShadowState>(TOPICS.shadows.getAccepted.topic)

  useEffect(() => {
    if (shadowState?.state.reported) {
      setRelay1State(shadowState.state.reported.relay1.state)
      setRelay2State(shadowState.state.reported.relay2.state)
    }
  }, [shadowState])

  const currentData = latestTelemetry || {
    temperature: 0,
    humidity: 0,
    timestamp: new Date().toISOString(),
  }

  return (
    <main>
      <div className="space-y-6">
        {/* Device Status Group */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Device Status</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <StatCard
              title="Connection"
              value={isOnline ? "Online" : "Offline"}
              description="Current device status"
              icon={isOnline ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
            />
            <StatCard
              title="Last Updated"
              value={format(new Date(currentData.timestamp), 'HH:mm:ss')}
              description={format(new Date(currentData.timestamp), 'yyyy-MM-dd')}
              icon={<Clock className="w-4 h-4 text-purple-500" />}
            />
          </div>
        </div>

        {/* Current Readings Group */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Current Readings</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <StatCard
              title="Temperature"
              value={`${currentData.temperature}°C`}
              description="Current temperature reading"
              icon={<Thermometer className="w-4 h-4 text-blue-500" />}
            />
            <StatCard
              title="Humidity"
              value={`${currentData.humidity}%`}
              description="Current humidity level"
              icon={<Droplets className="w-4 h-4 text-green-500" />}
            />
          </div>
        </div>

        {/* Relay States Group */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Relay States</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <StatCard
              title="Relay 1"
              value={relay1State ? "ON" : "OFF"}
              description="Current relay 1 state"
              icon={<Power className={`w-4 h-4 ${relay1State ? 'text-green-500' : 'text-gray-400'}`} />}
            />
            <StatCard
              title="Relay 2"
              value={relay2State ? "ON" : "OFF"}
              description="Current relay 2 state"
              icon={<Power className={`w-4 h-4 ${relay2State ? 'text-green-500' : 'text-gray-400'}`} />}
            />
          </div>
        </div>

        {/* 24h Statistics Group */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">24h Statistics</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <StatCard
              title="Average Temperature"
              value={`${last24HoursTempStats?.average ?? '--'}°C`}
              description="24-hour average"
              icon={<Thermometer className="w-4 h-4 text-blue-500" />}
            />
            <StatCard
              title="Average Humidity"
              value={`${last24HoursHumidityStats?.average ?? '--'}%`}
              description="24-hour average"
              icon={<Droplets className="w-4 h-4 text-green-500" />}
            />
          </div>
        </div>

        {/* Charts */}
        <div>
          <RealTimeTelemetryChart latestData={currentData} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <TelemetryChart
            data={historicalData}
            dataKey="temperature"
            title="Temperature History"
            color="#3b82f6"
          />
          <TelemetryChart
            data={historicalData}
            dataKey="humidity"
            title="Humidity History"
            color="#22c55e"
          />
        </div>
      </div>
    </main>
  )
}
