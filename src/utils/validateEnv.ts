import { Type } from '@sinclair/typebox';

export const schema = Type.Object({
    NODE_ENV: Type.String(),
    API_VERSION: Type.String(),
    ORIGIN: Type.String(),
    FIREBASE_API_KEY: Type.String(),
    PORT: Type.String(),
});
