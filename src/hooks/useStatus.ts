import { useEffect, useState } from "react";
import { useSubscribe } from "../hooks/useSubscribe";
import { TCradleTelemetryData } from "../types/cradle.types";

export function useDeviceOnlineStatus(topic: string) {
    const [isOnline, setIsOnline] = useState(false);
    const { message: telemetryData } = useSubscribe<TCradleTelemetryData>(topic);
    useEffect(() => {
        const checkOnlineStatus = () => {
            setIsOnline(!!telemetryData);
        };
        const intervalId = setInterval(checkOnlineStatus, 30000);
        checkOnlineStatus();
        return () => {
            clearInterval(intervalId);
        };
    }, [telemetryData]);
    return isOnline;
}
