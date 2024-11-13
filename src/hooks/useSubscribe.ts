
import { useEffect, useState } from "react";
import { usePubSubContext } from "../context/pubsub-context";

export function useSubscribe<TMQTTResponse>(topic: string) {
    const [message, setMessage] = useState<TMQTTResponse | null>(null);
    const pubsub = usePubSubContext();

    useEffect(() => {
        const subscription = pubsub.subscribe({ topics: [topic] }).subscribe({
            next: (data) => {
                console.log(`Subscription Response from ${topic}: ${data}`);
                setMessage(data as TMQTTResponse);
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [pubsub, topic]);

    return { message };
}