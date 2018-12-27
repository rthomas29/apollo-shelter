import db from '../../db/crud'

export const animals = async () => await db.findAllAnimals()

export const animal = async (_, args) => await db.findAnimalById(args.id)

export const createAnimal = async (_, args) => await db.createAnimal(args.input)

export const updateAnimal = async (_, args) => await db.findAnimalByIdAndUpdate(args.id, args.input)

export const deleteAnimal = async (_, args) => await db.deleteAnimalById(args.id)

export default {
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
    }
  }
}
