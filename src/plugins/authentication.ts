import { Unauthorized } from '@exceptions/error';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export const authentication = fastifyPlugin((fastify: FastifyInstance, _: unknown, done: () => void) => {
    const authPreHandler = async (request: FastifyRequest) => {
        try {
            // To be implemented

            const authToken =
                (request.headers.authorization ? request.headers.authorization?.split('Bearer ')[1] : '') ?? '';

            const user = true;

            if (!user) {
                throw Error();
            }

            // @ts-expect-error Throws error because the property user does not exist on type FastifyRequest
            request.user = user;
        } catch (error) {
            throw new Unauthorized();
        }
    };
    fastify.decorate('authenticateUser', authPreHandler);
    done();
});
