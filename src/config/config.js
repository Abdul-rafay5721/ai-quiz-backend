const config = {
    server: {
        mongoHost: process.env.MONGO_DB_HOST || '127.0.0.1',
        mongoPort: parseInt(process.env.MONGO_DB_PORT || '27017'),
        mongoDb: process.env.MONGO_DB,
        poolSize: process.env.MONGO_POOL_SIZE || '100',
        route: process.env.ROUTE || 'api',
        port: process.env.PORT || '4000',
        nodeEnv: process.env.NODE_ENV || 'dev',
        jwtSecretKey: process.env.JWT_SECRET,
        db: process.env.MONGO_DB || 'template',
        backendLink: process.env.BACKEND_LINK || '',
        smtpMail: process.env.SMTP_MAIL || '',
        smtpPassword: process.env.SMTP_PASS || '',
        email: 'admin@admin.com' || '',
        password: 'Admin@123' || '',
        gfClientID: process.env.GF_CLIENT_ID || '',
        gfSecret: process.env.GF_SECRET || '',
        clusterSize: process.env.CLUSTERSIZE,
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        uiLink: process.env.UI_LINK
    }
};

module.exports = config;
