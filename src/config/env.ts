import dotenv from 'dotenv'

const envConfig = dotenv.config()

const initAppEnv = () => {
  if (envConfig.error) {
    throw appConfig.error
  }
}

type ConfigType = {
  [key: string]: {
    appName: string
    port: number
    dbUri: string
  }
}

const baseConfig = {
  appName: process.env.APP_NAME || 'server',
  port: parseInt(process.env.PORT || '3000', 10),
}

export const appEnv = process.env.NODE_ENV || 'development'

export const appConfig: ConfigType = {
  test: {
    ...baseConfig,
    dbUri: process.env.MONGO_TEST || 'memory', // fallback to mongo-memory-server
  },
  development: {
    ...baseConfig,
    dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sample_dev',
  },
  production: {
    ...baseConfig,
    dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sample_prod',
  },
}

export const config = appConfig[appEnv]
export default initAppEnv
