import { configDotenv } from "dotenv";

configDotenv({quiet:true})


export const ENV={
    PORT :process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    JWT_TOKEN:process.env.JWT_TOKEN,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    CLOUD_NAME:process.env.CLOUD_NAME,
    API_SECRET:process.env.API_SECRET,
    API_KEY:process.env.API_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    CLIENT_URL:process.env.CLIENT_URL,
    UPSTASH_REDIS_REST_URL:process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN:process.env.UPSTASH_REDIS_REST_TOKEN
}