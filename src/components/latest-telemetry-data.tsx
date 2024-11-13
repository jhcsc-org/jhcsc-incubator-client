import { useSubscribe } from "../hooks/useSubscribe";
import { TCradleTelemetryData } from "../types/cradle.types";

export function LatestTelemetryData() {
    const {
        message: latestMessage
    } = useSubscribe<TCradleTelemetryData>("cradle/iot/data");
    return <p>{latestMessage ? JSON.stringify(latestMessage) : "No data available"}</p>;
}
