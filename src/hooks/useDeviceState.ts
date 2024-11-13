import { TOPICS } from "@/lib/constants";
import { TShadowDeviceShadowDocument, TShadowUpdatesMessage } from "@/types/cradle.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePublish } from "./usePublish";
import { useSubscribe } from "./useSubscribe";

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;
const INITIAL_DELAY = 300;

export function useDeviceState() {
    const [deviceState, setDeviceState] = useState<TShadowDeviceShadowDocument | undefined>();
    const [isMounted, setIsMounted] = useState(false);
    const retryCount = useRef(0);
    const retryTimeoutRef = useRef<NodeJS.Timeout>();
    const hasReceivedResponse = useRef(false);
    const isInitialFetch = useRef(true);

    const getDeviceState = usePublish(TOPICS.shadows.get.topic, {});
    const { message: shadowState } = useSubscribe<TShadowDeviceShadowDocument>(TOPICS.shadows.getAccepted.topic);
    const { message: documentUpdate } = useSubscribe<TShadowUpdatesMessage>(TOPICS.shadows.updateDocuments.topic);

    const refetchState = useCallback(() => {
        retryCount.current = 0;
        hasReceivedResponse.current = false;
        if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
        }
        getDeviceState();
    }, [getDeviceState]);

    useEffect(() => {
        if (shadowState) {
            console.log("Initial Shadow State Update", shadowState);
            setDeviceState(shadowState);

            if (isInitialFetch.current) {
                hasReceivedResponse.current = true;
                isInitialFetch.current = false;
            }
        }
    }, [shadowState]);

    useEffect(() => {
        if (documentUpdate?.current) {
            console.log("Document Update", documentUpdate);
            setDeviceState((prevState) => {
                if (!prevState) return documentUpdate.current as TShadowDeviceShadowDocument;
                const current = documentUpdate.current || {};

                return {
                    ...prevState,
                    state: {
                        desired: {
                            ...prevState.state?.desired,
                            ...current.state?.desired
                        },
                        reported: {
                            ...prevState.state?.reported,
                            ...current.state?.reported
                        }
                    },
                    metadata: current.metadata ?? prevState.metadata,
                    version: current.version ?? prevState.version,
                } as TShadowDeviceShadowDocument;
            });
        }
    }, [documentUpdate]);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), INITIAL_DELAY);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const attemptGetDeviceState = () => {
            if (hasReceivedResponse.current) return;

            console.log(`Attempting to get device state (attempt ${retryCount.current + 1}/${MAX_RETRIES})`);
            getDeviceState();

            if (!hasReceivedResponse.current && retryCount.current < MAX_RETRIES - 1) {
                retryCount.current += 1;
                retryTimeoutRef.current = setTimeout(attemptGetDeviceState, RETRY_DELAY);
            }
        };

        attemptGetDeviceState();
        return () => retryTimeoutRef.current && clearTimeout(retryTimeoutRef.current);
    }, [isMounted, getDeviceState]);

    return {
        deviceState,
        refetchState
    };
}
