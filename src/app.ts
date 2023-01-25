import initAppEnv from './config/env'
import initExpress from './config/express'

// Init config
initAppEnv()

// Init server
const server = initExpress()

// Terminate gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('⭐ Express server closed.')
  })
})
