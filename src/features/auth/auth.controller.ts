import { RefreshToken, type LoginUser } from '@features/auth/auth.interface';
import AuthService from '@features/auth/auth.service';
import { type FastifyRequest } from 'fastify';

class AuthController {
    public authService = new AuthService();

    public login = async (req: FastifyRequest<{ Body: LoginUser }>) => {
        const { email, password } = req.body;

        const data = await this.authService.loginUser({ email, password });

        return { data, message: 'login' };
    };

    public refreshToken = async (req: FastifyRequest<{ Body: RefreshToken }>) => {
        const { refreshToken } = req.body;

        const data = await this.authService.refreshToken({ refreshToken });

        return { data, message: 'login' };
    };
}

export default AuthController;
