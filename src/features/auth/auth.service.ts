import { NotFound } from '@exceptions/error';
import { LoginUser, RefreshToken } from '@features/auth/auth.interface';

class AuthService {
    public async loginUser(loginData: LoginUser) {
        // To be implemented
        const user = true;

        if (!user) {
            throw new NotFound('User not found');
        }

        return {
            user,
        };
    }

    public async refreshToken(refreshTokenData: RefreshToken) {
        // To be implemented

        const data = true;

        if (!data) {
            throw new NotFound('Invalid refresh token');
        }

        return { idToken: data };
    }
}

export default AuthService;
