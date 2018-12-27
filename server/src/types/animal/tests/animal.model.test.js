import db from '../../../db/crud'

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
    }

    const savedAnimal = await db.createAnimal(animal)
    expect(savedAnimal._id).toEqual(animal._id)
  })
})
