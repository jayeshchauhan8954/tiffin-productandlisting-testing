module.exports = {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    ENV: process.env.NEXT_PUBLIC_ENV,
    CRYPTO_SECRET_KEY: process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY,
    MODULE_ALIAS: process.env.NEXT_PUBLIC_MODULE_ALIAS,
    S3Configs: {
        base_url: process.env.NEXT_PUBLIC_S3_BASE_URL,
    },
    GC_MAP_KEY: process.env.NEXT_PUBLIC_GCP_MAP_KEY
};
