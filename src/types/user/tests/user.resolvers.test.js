import { createUser } from '../user.resolvers'

describe('createUser', () => {
  it('should create a user', async () => {
    const args = {
      input: {
        email: 'testuser1@test.com',
        password: 'password123',
        role: 'admin'
      }
    }
    const savedUser = await createUser(null, args)
    expect(savedUser.email).toEqual(args.input.email)
  })
})
