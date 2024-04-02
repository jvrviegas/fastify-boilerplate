import { FastifyInstance, RouteOptions } from 'fastify';

export interface Route {
    path: string;
    initializeRoutes: (fastify: FastifyInstance, opts: RouteOptions, done: () => void) => void;
}
