import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { CreateUserUseCase } from "../../application/use-cases/createUser";
import { User } from "../../domain/user";

export const userHandler = (createUserUseCase: CreateUserUseCase) => {
    return async (event: APIGatewayEvent, context: Context, callback: Callback) => {
        try {
            if (!event.body) {
                return callback(null, {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Request body is required" }),
                });
            }

            const user: User = JSON.parse(event.body);
            await createUserUseCase.execute(user);

            return callback(null, {
                statusCode: 201,
                body: JSON.stringify({ message: "User created successfully" }),
            });
        } catch (error) {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({ error: (error as Error).message }),
            });
        }
    };
};
