import { Static } from '@fastify/type-provider-typebox';
import { schema } from '@utils/validateEnv';
import { FastifyRequest as FR, FastifyRequest } from 'fastify';
import { DocumentData } from 'firebase-admin/firestore';

declare module 'fastify' {
    interface FastifyAuthenticatedRequest extends FR {
        user: DocumentData;
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        config: Static<typeof schema>;
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticateUser?: (request: FastifyRequest) => Promise<void>;
    }
}
