import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export const initSwagger = fastifyPlugin((fastify: FastifyInstance, _: unknown, done: () => void) => {
    const opts: FastifyDynamicSwaggerOptions = {
        swagger: {
            info: {
                title: 'Ladder Tournament System',
                description: 'Ladder Tournament System API documentation',
                version: '1.0.0',
            },
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
            schemes: ['http'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
    };

    fastify.register(fastifySwagger, opts);

    const uiOpts: FastifySwaggerUiOptions = {
        routePrefix: '/api-docs',
        staticCSP: true,
        transformStaticCSP: (header) => header,
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    };

    fastify.register(fastifySwaggerUi, uiOpts);
    done();
});
