import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV ?? 'development'}.local` });

export const { NODE_ENV, PORT, API_VERSION, ORIGIN, CREDENTIALS, FIREBASE_API_KEY } = process.env;
