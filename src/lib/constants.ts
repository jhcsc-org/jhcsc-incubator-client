import { TCradleTelemetryData } from "@/types/cradle.types";
import { PubSubConfig } from "@/utils/pubsub";

enum ActionType {
    Publish = "Publish",
    Subscribe = "Subscribe"
}

const THING_NAME = "cradle";
const SHADOW_NAME = "cradle";
const SHADOW_BASE = `$aws/things/${THING_NAME}/shadow/name/${SHADOW_NAME}`;
const PUBSUBCONFIG: PubSubConfig = {
    region: "ap-southeast-1",
    endpoint: "wss://a2m4ciprmhazub-ats.iot.ap-southeast-1.amazonaws.com/mqtt",
}


interface ITopic {
    readonly topic: string;
    readonly name: string;
    readonly action?: ActionType;
}

interface ITelemetryTopic<T> extends ITopic {
    readonly type: T;
}

interface IShadowTopics {
    readonly get: ITopic;
    readonly getAccepted: ITopic;
    readonly getRejected: ITopic;
    readonly update: ITopic;
    readonly updateDelta: ITopic;
    readonly updateAccepted: ITopic;
    readonly updateDocuments: ITopic;
    readonly updateRejected: ITopic;
    readonly delete: ITopic;
    readonly deleteAccepted: ITopic;
    readonly deleteRejected: ITopic;
}

interface ITopics {
    readonly telemetry: ITelemetryTopic<TCradleTelemetryData[]>;
    readonly shadows: IShadowTopics;
}

const createShadowTopic = (operation: string, action: ActionType): ITopic => ({
    topic: `${SHADOW_BASE}/${operation}`,
    name: `${operation.charAt(0).toUpperCase() + operation.slice(1)} Shadow`,
    action
});

const TOPICS: ITopics = {
    telemetry: {
        topic: "cradle/iot/data",
        name: "Telemetry Data",
        type: [] as TCradleTelemetryData[],
    },
    shadows: {
        get: createShadowTopic("get", ActionType.Publish),
        getAccepted: createShadowTopic("get/accepted", ActionType.Subscribe),
        getRejected: createShadowTopic("get/rejected", ActionType.Subscribe),
        update: createShadowTopic("update", ActionType.Publish),
        updateDelta: createShadowTopic("update/delta", ActionType.Subscribe),
        updateAccepted: createShadowTopic("update/accepted", ActionType.Subscribe),
        updateDocuments: createShadowTopic("update/documents", ActionType.Subscribe),
        updateRejected: createShadowTopic("update/rejected", ActionType.Subscribe),
        delete: createShadowTopic("delete", ActionType.Publish),
        deleteAccepted: createShadowTopic("delete/accepted", ActionType.Subscribe),
        deleteRejected: createShadowTopic("delete/rejected", ActionType.Subscribe),
    }
}

export { ActionType, PUBSUBCONFIG, TOPICS };

