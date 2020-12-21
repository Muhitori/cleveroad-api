// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('./config/envConfig')
const path = require('path')

module.exports = {
  ...envConfig(),
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/*.migration.js'],
  cli: {
    entitiesDir: './entities',
    migrationsDir: './migrations'
  }
}
