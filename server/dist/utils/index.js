"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTypeSchema = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loadTypeSchema = type => new Promise((resolve, reject) => {
  const pathToSchema = _path.default.join(process.cwd(), `src/types/${type}/${type}.gql`);

  _fs.default.readFile(pathToSchema, {
    encoding: 'utf-8'
  }, (err, schema) => {
    if (err) {
      return reject(err);
    }

    resolve(schema);
  });
});

exports.loadTypeSchema = loadTypeSchema;