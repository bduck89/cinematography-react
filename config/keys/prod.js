module.exports = {
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_SERVER: process.env.MONGODB_SERVER,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET,
    GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID
};