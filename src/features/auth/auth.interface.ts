import { Static } from '@fastify/type-provider-typebox';
import { LoginUserBody } from '@features/auth/auth.schema';

export type LoginUser = Static<typeof LoginUserBody>;

export interface RefreshToken {
    refreshToken: string;
}
