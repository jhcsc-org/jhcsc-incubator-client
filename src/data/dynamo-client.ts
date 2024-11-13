import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export class DynamoDBClient {
    private static instance: ReturnType<typeof generateClient<Schema>> | null = null;

    private constructor() { }

    public static getInstance(): ReturnType<typeof generateClient<Schema>> {
        if (!DynamoDBClient.instance) {
            DynamoDBClient.instance = generateClient<Schema>();
        }
        return DynamoDBClient.instance;
    }
}

export const dynamoClient = DynamoDBClient.getInstance();