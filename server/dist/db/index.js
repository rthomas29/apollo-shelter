"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connect = () => {
  return _mongoose.default.connect('mongodb://localhost:27017/now');
};

var _default = connect;
exports.default = _default;