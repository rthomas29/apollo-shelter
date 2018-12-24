"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _apolloServer = require("apollo-server");

var _lodash = require("lodash");

var _index = _interopRequireDefault(require("./db/index"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

var _animal = _interopRequireDefault(require("./types/animal/animal.resolvers"));

var _user = _interopRequireDefault(require("./types/user/user.resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = ['animal', 'user'];

const start = async () => {
  const rootSchema = `
    schema {
      query: Query,
      mutation: Mutation
    }
  `;
  const schemaTypes = await Promise.all(types.map(_utils.loadTypeSchema));
  const server = new _apolloServer.ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: (0, _lodash.merge)({}, _animal.default, _user.default)
  });
  await (0, _index.default)(_config.default.dbUrl);
  const {
    url
  } = await server.listen({
    port: _config.default.port
  });
  console.log(`🚀  GQL server ready at ${url}`);
};

exports.start = start;