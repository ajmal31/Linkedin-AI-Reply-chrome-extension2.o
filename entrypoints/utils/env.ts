import { config } from "dotenv";

config()

export const COHERE_CLIENT_TOKEN:string|undefined=import.meta.env.VITE_OAUTH_CLIENT_ID;