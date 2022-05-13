export default {
  type: '',
  host: '',
  port: '',
  username: '',
  password: '',
  database: '',
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
  extra: {
    trustServerCertificate: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
