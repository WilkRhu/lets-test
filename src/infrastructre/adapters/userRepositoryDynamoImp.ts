import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { User } from "../../domain/user";
import { UserRepository } from "../../application/ports/userRepository";

export class UserRepositoryDynamoImpl implements UserRepository {
    private readonly tableName: string;
    private readonly dynamoClient: DynamoDBClient;

    constructor() {
        this.tableName = process.env.USER_TABLE_NAME || "UsersTable";
        this.dynamoClient = new DynamoDBClient({});
    }

    async saveUser(user: User): Promise<void> {
        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: {
                id: { S: user.id },
                fullName: { S: user.fullName },
                dateOfBirth: { S: user.dateOfBirth },
                isActive: { BOOL: user.isActive },
                contacts: {
                    L: user.contacts.map(contact => ({
                        M: {
                            email: contact.email ? { S: contact.email } : undefined,
                            phone: contact.phone ? { S: contact.phone } : undefined,
                            isPrimary: { BOOL: contact.isPrimary },
                        },
                    })),
                },
            },
        });

        try {
            await this.dynamoClient.send(command);
        } catch (error) {
            throw new Error(`Failed to save user: ${(error as Error).message}`);
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                id: { S: userId },
            },
        });

        try {
            const response = await this.dynamoClient.send(command);

            if (!response.Item) {
                return null;
            }

            const user: User = {
                id: response.Item.id.S!,
                fullName: response.Item.fullName.S!,
                dateOfBirth: response.Item.dateOfBirth.S!,
                isActive: response.Item.isActive.BOOL!,
                contacts: response.Item.contacts.L!.map(contact => ({
                    email: contact.M?.email?.S,
                    phone: contact.M?.phone?.S,
                    isPrimary: contact.M?.isPrimary?.BOOL!,
                })),
            };

            return user;
        } catch (error) {
            throw new Error(`Failed to retrieve user: ${(error as Error).message}`);
        }
    }
}
