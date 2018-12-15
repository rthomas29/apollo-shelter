const mongoose = require('mongoose')

const animal = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    species: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    rescueDate: Date
  },
  { timestamps: true }
) // adds createdAt and updatedAt fields to schema

const Animal = mongoose.model('animal', animal)

module.exports = Animal
