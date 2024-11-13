import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    Telemetry: a
        .model({
            device: a.string(),
            temperature: a.float(),
            humidity: a.float(),
            timestamp: a.string().required(),
        })
        .authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
