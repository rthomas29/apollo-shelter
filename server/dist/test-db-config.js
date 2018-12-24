"use strict";

var _cuid = _interopRequireDefault(require("cuid"));

var _config = _interopRequireDefault(require("./src/config"));

var _lodash = _interopRequireDefault(require("lodash"));

var _user = require("./src/types/user/user.model");

var _animal = require("./src/types/animal/animal.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup file for test db
const models = {
  User: _user.User,
  Product: _animal.Product // helper to generate new Mongoose ObjectId type

};

global.newId = () => {
  return mongoose.Types.ObjectId();
}; // helper to remove passed collection from db


const remove = collection => new Promise((resolve, reject) => {
  collection.remove(err => {
    if (err) return reject(err);
    resolve();
  });
});

beforeEach(async done => {
  const db = (0, _cuid.default)(); // maps over collections in db and removes each collection to reset db state

  function clearDB() {
    return Promise.all(_lodash.default.map(mongoose.connection.collections, c => remove(c)));
  } // test db connection and setup


  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(_config.default.dbUrl + db, {
        useNewUrlParser: true,
        autoIndex: true
      });
      await clearDB();
      await Promise.all(Object.keys(models).map(name => models[name].init()));
    } catch (e) {
      console.log('connection error');
      console.error(e);
      throw e;
    }
  } else {
    await clearDB();
  }

  done();
}); // drop and disconnect db after each test block

afterEach(async done => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});
afterAll(done => {
  return done();
});