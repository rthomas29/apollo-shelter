import mongoose from 'mongoose'

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/now')
}

export default connect