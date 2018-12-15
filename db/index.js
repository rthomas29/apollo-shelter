const mongoose = require('mongoose')
const Animal = require('../types/animal/animal.model')
const dbOps = require('./crud')
const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/now')
}

module.exports = connect
