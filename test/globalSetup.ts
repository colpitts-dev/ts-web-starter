import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function globalSetup() {
  // it's needed in global space, because we don't want to create a new instance every test-suite
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(global as any).__MONGOINSTANCE = instance
  process.env.MONGO_TEST_URI =
    uri.slice(0, uri.lastIndexOf('/')) +
    `/${process.env.MONGO_TEST_DB || 'test'}`

  mongoose.set('strictQuery', false)

  try {
    // The following is to make sure the database is clean before any test starts
    const conn = await mongoose.connect(process.env.MONGO_TEST_URI)
    await conn.connection.db.dropDatabase()
    await mongoose.disconnect()
  } catch (e) {
    console.log('--- ERROR DROPPING TEST DB ---')
  }
}

export default globalSetup
