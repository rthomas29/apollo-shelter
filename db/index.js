const mongoose = require('mongoose')
const Animal = require('./models/animal')
const dbOps = require('./crud')
const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/now')
}

connect()
  .then(async connection => {
    const animal = {
      name: 'Holly',
      species: 'dog',
      weight: 15,
      color: 'white'
    }
    try {
      const newAnimal = await dbOps.createAnimal(animal)
      const foundAnimals = await dbOps.findAnimalByField('name', 'Nori')
      console.log('found animals', foundAnimals)
    } catch (error) {
      console.log('Error creating newAnimal', error)
    }
  })
  .catch(err => {
    console.log(err)
    mongoose.disconnect()
  })
