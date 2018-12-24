"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deleteAnimal = exports.updateAnimal = exports.createAnimal = exports.animal = exports.animals = void 0;

var _crud = _interopRequireDefault(require("../../db/crud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const animals = async () => await _crud.default.findAllAnimals();

exports.animals = animals;

const animal = async (_, args) => await _crud.default.findAnimalById(args.id);

exports.animal = animal;

const createAnimal = async (_, args) => await _crud.default.createAnimal(args.input);

exports.createAnimal = createAnimal;

const updateAnimal = async (_, args) => await _crud.default.findAnimalByIdAndUpdate(args.id, args.input);

exports.updateAnimal = updateAnimal;

const deleteAnimal = async (_, args) => await _crud.default.deleteAnimalById(args.id);

exports.deleteAnimal = deleteAnimal;
var _default = {
  Query: {
    animals,
    animal
  },
  Mutation: {
    createAnimal,
    deleteAnimal,
    updateAnimal
  },
  Animal: {
    id(animal) {
      return animal._id.toString();
    },

    name(animal) {
      return animal.name;
    }

  }
};
exports.default = _default;