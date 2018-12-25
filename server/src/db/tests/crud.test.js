import db from '../crud'

describe('db crud operations', () => {
  const animal = {
    _id: global.newId(),
    name: 'sparky',
    species: 'dog',
    weight: 20,
    color: 'brown',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  describe('findAllAnimals', () => {
    it('should return list of animal documents from db', async () => {
      const animal1 = {
        _id: global.newId(),
        name: 'sparky',
        species: 'dog',
        weight: 20,
        color: 'brown',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const animal2 = {
        _id: global.newId(),
        name: 'kitty',
        species: 'cat',
        color: 'white',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const animals = [animal1, animal2]
      await Promise.all(animals.map(animal => db.createAnimal(animal)))
      const animalsFromDB = await db.findAllAnimals()
      expect(animalsFromDB[0].name).toEqual('sparky')
      expect(animalsFromDB[1].name).toEqual('kitty')
    })
  })

  describe('findAnimalByField', () => {
    beforeEach(async () => {
      await db.createAnimal(animal)
    })
    it('should find animal by field', async () => {
      const foundAnimals = await db.findAnimalByField('species', 'dog')
      expect(foundAnimals[0].species).toBe(animal.species)
    })
  })
  describe('findAnimalById', () => {
    beforeEach(async () => {
      await db.createAnimal(animal)
    })
    it('should return Animal document with given id', async () => {
      const foundAnimal = await db.findAnimalById(animal._id)
      expect(foundAnimal.name).toEqual(animal.name)
      expect(foundAnimal.weight).toEqual(animal.weight)
    })
  })

  describe('findAnimalByIdAndUpdate', () => {
    beforeEach(async () => {
      await db.createAnimal(animal)
    })
    it('should update animal and return updated record', async () => {
      const updatedAnimal = { name: 'updatedSparky' }
      const result = await db.findAnimalByIdAndUpdate(animal._id, updatedAnimal)
      expect(result.name).toEqual(updatedAnimal.name)
      expect(result._id).toEqual(animal._id)
    })
  })

  describe('findByIdAndDelete', () => {
    beforeEach(async () => {
      await db.createAnimal(animal)
    })
    it('should delete animal from db', async () => {
      const deletedAnimal = await db.deleteAnimalById(animal._id)
      expect(deletedAnimal.name).toEqual('sparky')
    })
  })
})
