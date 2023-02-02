import initAppEnv from './config/env'
import initExpress from './config/express'
import { connectDB, disconnectDB } from './config/mongodb'

// Init config
initAppEnv()

// Connect to MongoDB
connectDB(() => {
  // Init web server
  const server = initExpress()

  // Graceful termination
  process.on('SIGTERM', async () => {
    server.close(() => {
      console.log('⭐ Web server closed.')
    })
    await disconnectDB()
  })
})
