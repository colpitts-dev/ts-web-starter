import dotenv from 'dotenv'

function initAppEnv() {
  const appConfig = dotenv.config()
  if (appConfig.error) {
    throw appConfig.error
  }
}

export default initAppEnv
