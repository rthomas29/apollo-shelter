const db = require('../../db/crud')

const animals = async () => await db.findAllAnimals()

const animal = async (_, args) => await db.findAnimalById(args.id)

const createAnimal = async (_, args) => await db.createAnimal(args.animal)

const updateAnimal = async (_, args) => await db.findAnimalByIdAndUpdate(args.id, args.input)

const deleteAnimal = async (_, args) => await db.deleteAnimalById(args.id)

module.exports = {
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
      return animal._id.toString()
    },
    name(animal) {
      return animal.name
    }
  }
}
