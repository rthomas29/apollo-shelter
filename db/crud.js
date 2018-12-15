const Animal = require('./models/animal')

const createAnimal = animal => {
  return Animal.create(animal)
}

const findAnimalByField = (field, value) => {
  return Animal.find({ [field]: value })
    .lean()
    .exec()
}
const findAnimalById = id => {
  return Animal.findById(id)
    .lean()
    .exec()
}

const findAnimalByIdAndUpdate = (id, updatedAnimal) => {
  return Animal.findByIdAndUpdate(id, updatedAnimal)
    .lean()
    .exec()
}

const deleteAnimalById = id => {
  return Animal.findByIdAndDelete(id)
    .lean()
    .exec()
}

module.exports = {
  createAnimal,
  findAnimalByField,
  findAnimalById,
  findAnimalByIdAndUpdate,
  deleteAnimalById
}
