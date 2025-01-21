import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { User } from "../../domain/user";
import { UserRepository } from "../../application/ports/userRepository";

export class DynamoDbRepository implements UserRepository {
    private client: DynamoDBClient;
    private tableName: string;

    constructor(tableName: string) {
        this.client = new DynamoDBClient({ region: "us-east-1" });
        this.tableName = tableName;
    }

    async saveUser(user: User): Promise<void> {
        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: {
                id: { S: user.id },
                fullName: { S: user.fullName },
                dateOfBirth: { S: user.dateOfBirth },
                isActive: { BOOL: user.isActive },
                // Serializar outros campos aqui
            },
        });
        await this.client.send(command);
    }

    async getUserById(userId: string): Promise<User | null> {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: { id: { S: userId } },
        });
        const response = await this.client.send(command);
        if (!response.Item) return null;

        return {
            id: response.Item.id.S!,
            fullName: response.Item.fullName.S!,
            dateOfBirth: response.Item.dateOfBirth.S!,
            isActive: response.Item.isActive.BOOL!,
            addresses: [], // Adaptar
            contacts: [], // Adaptar
        };
    }
}
