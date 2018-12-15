const db = require('../../db/crud')

const animals = async () => await db.findAllAnimals()

const createAnimal = async (_, args) => await db.createAnimal(args.animal)

const deleteAnimal = async (_, args) => await db.deleteAnimalById(args.id)

module.exports = {
  Query: {
    animals
  },
  Mutation: {
    createAnimal,
    deleteAnimal
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
