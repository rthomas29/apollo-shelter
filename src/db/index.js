import mongoose from 'mongoose'
import config from '../config'

const connect = () => {
  return mongoose.connect(config.dbUrl)
}

export default connect
