import { TOPICS } from '@/lib/constants';
import { TCradleShadowDeviceConfiguration, TCradleShadowDeviceShadowState, TShadowDeviceShadowDocument } from '@/types/cradle.types';
import { useCallback, useEffect, useState } from 'react';
import { usePublish } from './usePublish';
import { useSubscribe } from './useSubscribe';

export function useShadowState() {
    const publish = usePublish(TOPICS.shadows.update.topic);
    const { message: acceptedUpdate } = useSubscribe<TShadowDeviceShadowDocument>(TOPICS.shadows.updateAccepted.topic);

    const [shadowState, setShadowState] = useState<TCradleShadowDeviceShadowState | null>(null);

    const updateDesiredState = useCallback((update: any) => {
        publish({
            state: {
                desired: update,
                reported: null
            }
        });
    }, [publish]);

    useEffect(() => {
        if (acceptedUpdate?.state) {
            // @ts-expect-error
            setShadowState(prev => ({
                state: {
                    desired: {
                        ...(prev?.state?.desired || {}),
                        ...(acceptedUpdate.state?.desired || {})
                    },
                    reported: {
                        ...(prev?.state?.reported || {}),
                        ...(acceptedUpdate.state?.reported || {})
                    }
                }
            }));
        }
    }, [acceptedUpdate]);

    const isOutOfSync = useCallback((desiredKey: string, reportedKey: string) => {
        const desired = shadowState?.state?.desired?.[desiredKey as keyof TCradleShadowDeviceConfiguration];
        const reported = shadowState?.state?.reported?.[reportedKey as keyof TCradleShadowDeviceConfiguration];
        return JSON.stringify(desired) !== JSON.stringify(reported);
    }, [shadowState]);

    return {
        shadowState,
        updateDesiredState,
        isOutOfSync,
        isConnected: !!shadowState
    };
}