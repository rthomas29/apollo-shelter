"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const animal = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  weight: {
    type: Number
  },
  color: {
    type: String,
    required: true
  },
  rescueDate: Date
}, {
  timestamps: true
}); // adds createdAt and updatedAt fields to schema

const Animal = _mongoose.default.model('animal', animal);

var _default = Animal;
exports.default = _default;