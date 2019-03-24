import Animal from '../types/animal/animal.model'
import User from '../types/user/user.model'

const db = {
  createAnimal: animal => Animal.create(animal),

  createUser: user => User.create(user),

  findAllAnimals: () =>
    Animal.find({})
      .lean()
      .exec(),

  findAnimalByField: (field, value) =>
    Animal.find({ [field]: value })
      .lean()
      .exec(),

  findAnimalById: id =>
    Animal.findById(id)
      .lean()
      .exec(),

  findAnimalByIdAndUpdate: (id, updatedAnimal) =>
    Animal.findByIdAndUpdate(id, updatedAnimal, { new: true })
      .lean()
      .exec(),

  deleteAnimalById: id =>
    Animal.findByIdAndDelete(id)
      .lean()
      .exec(),


  findUserByEmail: ({ email }) =>
    User.findOne({ email })
      .select('-password')
      .lean()
      .exec(),

  findUserByApiKey: (apiKey) =>
    User.findOne({ apiKey })
      .select('-password')
      .lean()
      .exec()
}

export default db
