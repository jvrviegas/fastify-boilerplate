import IndexController from '@features/default/index.controller';
import { Route } from '@interfaces/routes.interface';
import { FastifyInstance, RouteOptions } from 'fastify';

class IndexRoute implements Route {
    public path = '/';

    public indexController = new IndexController();

    public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
        fastify.route({
            method: 'GET',
            url: this.path,
            schema: {
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'string',
                        example: 'ok',
                    },
                },
            },
            handler: IndexController.index,
        });
        done();
    }
}

export default IndexRoute;
