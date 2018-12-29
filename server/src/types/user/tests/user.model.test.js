import bcrypt from 'bcrypt'
import db from '../../db/crud'
const comparePassword = (plainPassword, hash = 8) =>
  new Promise(async (resolve, reject) => {
    bcrypt.compare(plainPassword, hash, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })

describe('User', () => {
  it('should create User documents', async () => {
    const newUser = {
      email: 'newUser@user.com',
      password: 'password123',
      role: 'employee'
    }
    const savedUser = await db.createUser(newUser)
    const savedUserPassword = await comparePassword(newUser.password, savedUser.password)
    expect(savedUserPassword).toBe(true)
  })
})
