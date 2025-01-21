import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDbRepository } from "../adapters/dynamoDbRepository";
import { CreateUserUseCase } from "../../application/use-cases/createUser";

const repository = new DynamoDbRepository("UsersTable");
const createUserUseCase = new CreateUserUseCase(repository, {
    validateUser: (user) => {
        if (!user.fullName || !user.contacts.length) {
            throw new Error("Validation failed");
        }
    },
});

export const handler: APIGatewayProxyHandler = async (event) => {
    const body = JSON.parse(event.body!);
    await createUserUseCase.execute(body);

    return {
        statusCode: 201,
        body: JSON.stringify({ message: "User created successfully" }),
    };
};
