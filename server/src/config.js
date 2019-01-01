import dotenv from 'dotenv'
dotenv.config()

const config = {
  dbUrl: process.env.MONGODB_URI,
  port: process.env.PORT || 4000
}

export default config
