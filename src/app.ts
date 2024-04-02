import { API_VERSION, CREDENTIALS, NODE_ENV, PORT } from '@config';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import fastifyHelmet from '@fastify/helmet';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { initializeRoutes } from '@plugins/initializeRoute';
import { initSwagger } from '@plugins/swagger';
import { schemaErrorFormatter } from '@utils/schemaErrorFormatter';
import { schema } from '@utils/validateEnv';
import ajvErrors from 'ajv-errors';
import Fastify, { type FastifyError, type FastifyInstance } from 'fastify';

import { authentication } from './plugins/authentication';

class App {
    public app: FastifyInstance;

    public env: string;

    public port: number;

    constructor() {
        this.app = Fastify({
            schemaErrorFormatter,
            ajv: {
                customOptions: {
                    coerceTypes: false,
                    allErrors: true,
                },
                plugins: [ajvErrors],
            },
            logger: true,
            trustProxy: true,
        }).withTypeProvider<TypeBoxTypeProvider>();

        this.env = NODE_ENV ?? 'development';
        this.port = Number(PORT) ?? 3001;

        this.init();
    }

    public async listen() {
        try {
            const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

            // You must listen on all IPV4 addresses in Cloud Run
            const host = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;
            await this.app.listen({ host, port: this.port });
        } catch (err) {
            this.app.log.error(err);
            process.exit(1);
        }
    }

    public getServer() {
        return this.app;
    }

    private init() {
        this.initializePlugins();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializePlugins() {
        this.app.register(fastifyEnv, { dotenv: true, schema });
        this.app.register(fastifyCors, {
            origin: '*',
            exposedHeaders: 'Content-Range,X-Content-Range',
            credentials: CREDENTIALS === 'true',
        });
        this.app.register(fastifyHelmet);
        this.app.register(fastifyCompress);
        this.app.register(initSwagger);
        this.app.register(authentication);
    }

    private initializeRoutes() {
        this.app.register(initializeRoutes, { prefix: `api/${API_VERSION}` });
    }

    private initializeErrorHandling() {
        this.app.setErrorHandler((error: FastifyError, request, reply) => {
            const status: number = error.statusCode ?? 500;
            const message: string = status === 500 ? 'Something went wrong' : error.message ?? 'Something went wrong';

            this.app.log.error(`[${request.method}] ${request.url} >> StatusCode:: ${status}, Message:: ${message}`);

            return reply.status(status).send({ error: true, message });
        });
    }
}

export default App;
