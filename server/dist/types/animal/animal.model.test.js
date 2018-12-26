"use strict";

var _crud = _interopRequireDefault(require("../../db/crud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('animal model', () => {
  it('should create documents based on Animal model', async () => {
    const animal = {
      _id: global.newId(),
      name: 'New Animal',
      species: 'dog',
      weight: 25,
      color: 'brown',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const savedAnimal = await _crud.default.createAnimal(animal);
    expect(savedAnimal._id).toEqual(animal._id);
  });
});