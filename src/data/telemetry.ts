import { queryOptions } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { Schema } from '../../amplify/data/resource';
import { dynamoClient } from "./dynamo-client";

const MINIMUM_LOADING_TIME = 1000;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function withMinimumDelay<T>(promise: Promise<T>): Promise<T> {
    const start = Date.now();
    const result = await promise;
    const elapsed = Date.now() - start;
    const remainingDelay = MINIMUM_LOADING_TIME - elapsed;

    if (remainingDelay > 0) {
        await delay(remainingDelay);
    }

    return result;
}

type TelemetryItem = Schema["Telemetry"]["type"];

interface TelemetryStats {
    latest: number;
    average: number;
    min: number;
    max: number;
}

export function calculateStats(values: (number | undefined)[]): TelemetryStats | undefined {
    const validValues = values.filter((v): v is number => v !== undefined);
    if (validValues.length === 0) return undefined;

    return {
        latest: validValues[0],
        average: Number((validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(2)),
        min: Math.min(...validValues),
        max: Math.max(...validValues)
    };
}

export async function fetchTelemetryData(dateRange?: DateRange): Promise<
    Pick<TelemetryItem, "temperature" | "humidity" | "timestamp">[]
> {
    return withMinimumDelay(
        dynamoClient.models.Telemetry.list({
            selectionSet: ["temperature", "humidity", "timestamp"],
            filter: (dateRange?.from && dateRange?.to) ? {
                timestamp: {
                    between: [
                        dateRange.from.toISOString().split('T')[0] + 'T00:00:00.000Z',
                        dateRange.to.toISOString().split('T')[0] + 'T23:59:59.999Z'
                    ]
                }
            } : undefined,
        }).then(({ data: items, errors }) => {
            if (errors) throw new Error(errors[0].message);
            return items;
        })
    );
}

export const telemetryQueryOptions = (dateRange?: DateRange) =>
    queryOptions({
        queryKey: ['telemetry', dateRange?.from?.toISOString(), dateRange?.to?.toISOString()],
        queryFn: () => fetchTelemetryData(dateRange),
        staleTime: 30 * 1000, // consider data fresh for 30 seconds
        gcTime: 5 * 60 * 1000, // keep unused data in cache for 5 minutes
        refetchInterval: 30 * 1000, // refetch every 30 seconds
    })