export interface TCradleTelemetryData {
    temperature: number;
    humidity: number;
    timestamp: string;
}

export interface TCradleShadowRelayStatus {
    label: string;
    state: boolean;
}

export interface TCradleShadowEnvironmentalThresholds {
    temperatureHigh: number;
    temperatureLow: number;
    humidity: number;
}

export interface TCradleShadowDeviceConfiguration {
    welcomeMessage?: string;
    relay1: TCradleShadowRelayStatus;
    relay2: TCradleShadowRelayStatus;
    autoControlEnabled: boolean;
    thresholds: TCradleShadowEnvironmentalThresholds;
}

export interface TCradleShadowDeviceShadowState {
    state: {
        desired?: TCradleShadowDeviceConfiguration;
        reported: TCradleShadowDeviceConfiguration;
    };
}

/**
 * Represents the value of an attribute in the device shadow.
 */
export type TShadowAttributeValue =
    | number
    | string
    | boolean
    | TShadowAttributeValue[]
    | { [key: string]: TShadowAttributeValue };

/**
 * Represents the state section of a device shadow.
 */
export interface TShadowDeviceShadowState {
    desired?: { [key: string]: TShadowAttributeValue };
    reported?: { [key: string]: TShadowAttributeValue };
    delta?: { [key: string]: TShadowAttributeValue };
}

/**
 * Represents metadata for each attribute in the state sections.
 */
export interface TShadowMetadataSection {
    [attribute: string]: {
        timestamp: number;
    };
}

/**
 * Groups metadata for desired, reported, and delta states.
 */
export interface TShadowDeviceShadowMetadata {
    desired?: TShadowMetadataSection;
    reported?: TShadowMetadataSection;
    delta?: TShadowMetadataSection;
}

/**
 * Represents a request to update the device shadow.
 */
export interface TShadowRequestStateDocument {
    state: {
        desired?: { [key: string]: TShadowAttributeValue };
        reported?: { [key: string]: TShadowAttributeValue };
    };
    clientToken?: string;
    version?: number;
}

/**
 * Represents an accepted response after a successful update.
 */
export interface TShadowResponseStateDocumentAccepted {
    state: {
        desired: { [key: string]: TShadowAttributeValue };
    };
    metadata: {
        desired: TShadowMetadataSection;
    };
    timestamp: number;
    clientToken?: string;
    version: number;
}

/**
 * Represents a delta response indicating differences between desired and reported states.
 */
export interface TShadowResponseStateDocumentDelta {
    state: { [key: string]: TShadowAttributeValue };
    metadata: {
        [key: string]: {
            timestamp: number;
        };
    };
    timestamp: number;
    clientToken?: string;
    version: number;
}

/**
 * Represents the state and metadata of either the previous or current state in a documents response.
 */
export interface TShadowPreviousCurrentState {
    state: {
        desired?: { [key: string]: TShadowAttributeValue };
        reported?: { [key: string]: TShadowAttributeValue };
    };
    metadata: TShadowDeviceShadowMetadata;
    version: number;
}

/**
 * Represents a documents response containing both previous and current states.
 */
export interface TShadowResponseStateDocumentDocuments {
    previous: TShadowPreviousCurrentState;
    current: TShadowPreviousCurrentState;
    timestamp: number;
    clientToken?: string;
}

/**
 * Represents an error response from the Device Shadow service.
 */
export interface TShadowErrorResponseDocument {
    code: number;
    message: string;
    timestamp?: number;
    clientToken?: string;
}

/**
 * Represents a response containing a list of shadow names.
 */
export interface TShadowNameListResponseDocument {
    results: string[];
    nextToken?: string;
    timestamp: number;
}

/**
 * Represents an empty shadow document.
 */
export type TShadowEmptyShadowDocument = object

/**
 * Represents the overall structure of a device shadow document.
 */
export interface TShadowDeviceShadowDocument {
    state?: TShadowDeviceShadowState;
    metadata?: TShadowDeviceShadowMetadata;
    version?: number;
    timestamp?: number;
    clientToken?: string;
}

export interface TShadowUpdatesMessage {
    previous?: Current;
    current?: Current;
    timestamp?: number;
}

export interface Current {
    state?: State;
    metadata?: Metadata;
    version?: number;
}

export interface Metadata {
    desired?: MetadataDesired;
    reported?: MetadataDesired;
}

export interface MetadataDesired {
    welcome?: AutoControl;
    relay1?: PurpleRelay;
    relay2?: PurpleRelay;
    auto_control?: AutoControl;
    thresholds?: PurpleThresholds;
}

export interface AutoControl {
    timestamp?: number;
}

export interface PurpleRelay {
    label?: AutoControl;
    state?: AutoControl;
}

export interface PurpleThresholds {
    temperature_high?: AutoControl;
    temperature_low?: AutoControl;
    humidity?: AutoControl;
}

export interface State {
    desired?: StateDesired;
    reported?: StateDesired;
}

export interface StateDesired {
    welcome?: string;
    relay1?: FluffyRelay;
    relay2?: FluffyRelay;
    auto_control?: boolean;
    thresholds?: FluffyThresholds;
}

export interface FluffyRelay {
    label?: string;
    state?: boolean;
}

export interface FluffyThresholds {
    temperature_high?: number;
    temperature_low?: number;
    humidity?: number;
}