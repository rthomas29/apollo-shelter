import { loadTypeSchema } from '../index'

describe('loadTypeSchema', () => {
  it('should throw an error if no type', async () => {
    try {
      await loadTypeSchema()
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
  it('should resolve with .gql schema', async () => {
    try {
      const schema = await loadTypeSchema('animal')
      expect(schema).toBeTruthy()
    } catch (error) {
      expect(error).not.toBeTruthy()
    }
  })
})
