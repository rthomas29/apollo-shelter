"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _animal = _interopRequireDefault(require("../types/animal/animal.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = {
  createAnimal: animal => {
    return _animal.default.create(animal);
  },
  findAllAnimals: () => _animal.default.find({}).lean().exec(),
  findAnimalByField: (field, value) => {
    return _animal.default.find({
      [field]: value
    }).lean().exec();
  },
  findAnimalById: id => {
    return _animal.default.findById(id).lean().exec();
  },
  findAnimalByIdAndUpdate: (id, updatedAnimal) => {
    return _animal.default.findByIdAndUpdate(id, updatedAnimal, {
      new: true
    }).lean().exec();
  },
  deleteAnimalById: id => {
    return _animal.default.findByIdAndDelete(id).lean().exec();
  }
};
var _default = db;
exports.default = _default;