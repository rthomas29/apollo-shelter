import db from '../../../db/crud'
import { animals, animal, createAnimal, updateAnimal, deleteAnimal } from '../animal.resolvers'

describe('animal resolvers', () => {
  describe('animals', () => {
    it('should return all animals in db', async () => {
      await db.createAnimal({
        name: 'spot',
        color: 'white',
        species: 'dog',
        weight: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      const returnedAnimals = await animals()
      expect(returnedAnimals[0].name).toEqual('spot')
      expect(returnedAnimals[0].species).toEqual('dog')
    })
  })

  describe('animal', () => {
    it('should return the found animal or empty array', async () => {
      const savedAnimal = await db.createAnimal({
        _id: global.newId(),
        name: 'bambam',
        color: 'black',
        species: 'dog',
        weight: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      const foundAnimal = await animal(null, { id: savedAnimal._id })
      expect(foundAnimal.name).toEqual('bambam')
      expect(foundAnimal._id).toEqual(savedAnimal._id)
    })
  })

  describe('createAnimal', () => {
    it('should create a new animal in db', async () => {
      const args = {
        input: {
          name: 'wamwam',
          species: 'cat',
          color: 'brown',
          weight: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
      const savedAnimal = await createAnimal(null, args)
      expect(savedAnimal.name).toEqual('wamwam')
    })
  })

  describe('updateAnimal', () => {
    it('should update animal in db', async () => {
      const id = global.newId()
      const args = {
        id,
        input: {
          _id: id,
          name: 'wamwam',
          species: 'cat',
          color: 'brown',
          weight: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
      await db.createAnimal(args.input)
      const updated = await updateAnimal(null, args)
      expect(updated.name).toEqual('wamwam')
    })
  })

  describe('deleteAnimal', () => {
    it('should delete specified animal', async () => {
      const id = global.newId()
      const args = {
        id,
        input: {
          _id: id,
          name: 'porky',
          species: 'pig',
          color: 'pink',
          weight: 45,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
      await db.createAnimal(args.input)
      const deleted = await deleteAnimal(null, args)
      expect(deleted.name).toEqual('porky')
    })
  })
})
