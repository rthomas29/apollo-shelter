import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const roles = { admin: 'admin', employee: 'employee' }

export const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: Object.keys(roles),
      required: true,
      default: roles.admin
    },
    apiKey: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    this.password = hash
    next()
  })
})

const User = mongoose.model('user', UserSchema)

export default User
