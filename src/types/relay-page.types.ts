export type UpdateAction =
    | { type: 'relay'; state?: boolean; label?: string }
    | { type: 'autoControl'; state: boolean }
    | { type: 'threshold'; field: string; value: number }
    | { type: 'shadow'; state: { desired: any; reported: any } };

export type RelaySection = {
    title: string;
    relayKey: 'relay1' | 'relay2';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    desired: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reported: Readonly<any>;  // Make reported readonly
    showReported: boolean;
    onToggle: (state: boolean) => void;
    isOutOfSync: boolean;
};