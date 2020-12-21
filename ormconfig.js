// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('./config/envConfig')

module.exports = {
  ...envConfig(),
  synchronize: false,
  entities: ['./entities/*'],
  migrations: ['./migrations/*'],
  cli: {
    entitiesDir: './entities',
    migrationsDir: './migrations'
  }
}
