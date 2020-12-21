const envConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      username: 'root',
      password: 'root',
      database: 'cleveroadDB',
      host: '127.0.0.1',
      port: '3306',
      type: 'mysql',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  } else {
    return {
      username: 'root',
      password: 'root',
      database: 'cleveroadDB',
      port: '3306',
      host: '127.0.0.1',
      type: 'mysql'
    }
  }
}

module.exports = envConfig
