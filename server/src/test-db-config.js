// Setup file for test db

import cuid from 'cuid'
import config from './src/config'
import _ from 'lodash'
import { User } from './src/types/user/user.model'
import { Product } from './src/types/animal/animal.model'

const models = { User, Product }

// helper to generate new Mongoose ObjectId type
global.newId = () => {
  return mongoose.Types.ObjectId()
}

// helper to remove passed collection from db
const remove = collection =>
  new Promise((resolve, reject) => {
    collection.remove(err => {
      if (err) return reject(err)
      resolve()
    })
  })

beforeEach(async done => {
  const db = cuid()
  // maps over collections in db and removes each collection to reset db state
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
  }
  // test db connection and setup
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        config.dbUrl + db,
        {
          useNewUrlParser: true,
          autoIndex: true
        }
      )
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})

// drop and disconnect db after each test block
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
