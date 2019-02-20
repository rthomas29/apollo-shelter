import mongoose from 'mongoose'

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
      type: Number
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

export default Animal
