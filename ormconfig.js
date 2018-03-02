const {
    POSTGRES_USER = "pasynkov",
    POSTGRES_PASSWORD = "",
    POSTGRES_DB = "gulliver",
    POSTGRES_HOST = "localhost",
    POSTGRES_PORT = 5433,
    NODE_ENV = 'development',
} = process.env;

module.exports = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [
        // NODE_ENV === 'production' ? 'dist/entities/**/*.entity.js' : 'src/entities/**/*.entity{.ts,.js}',
        // 'dist/entities/**/*.entity.js',
        'src/entities/**/*.entity.{js,ts}',
    ],
    migrations: [
        // NODE_ENV === 'production' ? 'dist/entities/**/*.entity.js' : 'src/entities/**/*.entity{.ts,.js}',
        'src/migrations/*.ts',
        // 'dist/migrations/*.js',
    ],
    logging: true,
    cli: {
        migrationsDir: "src/migrations"
    },
    synchronize: true,
};