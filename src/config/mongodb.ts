import mongoose from 'mongoose'
import { config } from './env'

export async function connectDB(cb?: () => void) {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.dbUri, {
      autoCreate: true,
    })
    console.log(`💾 [${config.appName}]: MongoDB successfully connected`)
    cb ? cb() : null
  } catch (error) {
    console.log(`🚫 [${config.appName}]: MongoDB connect error`)
    process.exit(0)
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close(false, () => {
      console.log('💫 MongoDB connection closed.')
    })
  } catch (error) {
    console.log(`🚫 [${config.appName}]: MongoDB disconnect error`)
  }
}
