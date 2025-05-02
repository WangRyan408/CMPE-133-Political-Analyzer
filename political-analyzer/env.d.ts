declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test"
    NEXT_PUBLIC_SITE_URL: string
    NEXT_PUBLIC_API_URL: string
    DATABASE_URL: string
    JWT_SECRET: string
    DISQUS_SHORTNAME: string
    SENTIMENT_API_KEY: string
  }
}
