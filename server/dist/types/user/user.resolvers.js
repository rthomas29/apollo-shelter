"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createUser = void 0;

var _crud = _interopRequireDefault(require("../../db/crud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = async (_, args) => await _crud.default.createUser(args.input);

exports.createUser = createUser;
var _default = {
  Mutation: {
    createUser
  }
};
exports.default = _default;