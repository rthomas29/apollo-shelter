import { ERRORS } from '../../utils/constants'
import { AuthenticationError } from 'apollo-server'

export const animals = async (_, __, { user, db }) => {
  if (!user) throw new AuthenticationError(ERRORS.NOT_LOGGED_IN)
  const allAnimals = await db.findAllAnimals()
  return allAnimals
}

export const animal = async (_, { id }, { user, db }) => {
  if (!user) throw new AuthenticationError(ERRORS.NOT_LOGGED_IN)
  const fetchedAnimal = await db.findAnimalById(id)
  return fetchedAnimal
}

export const createAnimal = async (_, { input }, { user, db }) => {
  if (!user || user.role !== 'admin') throw new AuthenticationError(ERRORS.UNAUTHORIZED)
  const createdAnimal = await db.createAnimal(input)
  return createdAnimal
}

export const updateAnimal = async (_, { id, input }, { user, db }) => {
  if (!user || user.role !== 'admin') throw new AuthenticationError(ERRORS.UNAUTHORIZED)
  const updatedAnimal = await db.findAnimalByIdAndUpdate(id, input)
  return updatedAnimal
}

export const deleteAnimal = async (_, { id }, { user, db }) => {
  if (!user || user.role !== 'admin') throw new AuthenticationError(ERRORS.UNAUTHORIZED)
  const deletedAnimal = await db.deleteAnimalById(id)
  return deletedAnimal
}

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
    },
    name(animal, args) {
      return args.case === 'uppercase' ? animal.name.toUpperCase() : animal.name.toLowerCase()
    },
    weight(animal, args) {
      if (args.weightType === 'lbs') return `${animal.weight} lbs`
      if (args.weightType === 'kgs') return `${animal.weight} kgs`
      
    }
  }
}
