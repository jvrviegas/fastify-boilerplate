import AuthController from '@features/auth/auth.controller';
import { LoginUserSchema, RefreshTokenSchema } from '@features/auth/auth.schema';
import { type Route } from '@interfaces/routes.interface';
import { type FastifyInstance, type RouteOptions } from 'fastify';

class AuthRoute implements Route {
    public path = '/auth';

    public authController = new AuthController();

    public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
        fastify.route({
            method: 'post',
            url: `${this.path}/login`,
            schema: LoginUserSchema,
            handler: this.authController.login,
        });
        fastify.route({
            method: 'post',
            url: `${this.path}/refreshToken`,
            schema: RefreshTokenSchema,
            handler: this.authController.refreshToken,
        });
        done();
    }
}

export default AuthRoute;
