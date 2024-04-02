import { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';
import AuthRoute from '@features/auth/auth.route';
import IndexRoute from '@features/default/index.route';
import { Route } from '@interfaces/routes.interface';
import { FastifyPluginOptions } from 'fastify';

export const initializeRoutes: FastifyPluginCallbackTypebox<FastifyPluginOptions> = (server, _, done) => {
    // add the new routes here
    const routes = [new IndexRoute(), new AuthRoute()];
    routes.forEach((route: Route) => {
        server.register(route.initializeRoutes.bind(route));
    });
    done();
};
