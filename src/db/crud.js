import Animal from '../types/animal/animal.model'
import User from '../types/user/user.model'

const db = {
  createAnimal: animal => {
    return Animal.create(animal)
  },
  findAllAnimals: () =>
    Animal.find({})
      .lean()
      .exec(),
  findAnimalByField: (field, value) => {
    return Animal.find({ [field]: value })
      .lean()
      .exec()
  },
  findAnimalById: id => {
    return Animal.findById(id)
      .lean()
      .exec()
  },

  findAnimalByIdAndUpdate: (id, updatedAnimal) => {
    return Animal.findByIdAndUpdate(id, updatedAnimal, { new: true })
      .lean()
      .exec()
  },
  deleteAnimalById: id => {
    return Animal.findByIdAndDelete(id)
      .lean()
      .exec()
  },
  createUser: user => {
    return User.create(user)
  }
}

export default db
