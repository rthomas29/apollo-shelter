import { getSchemaTypes, types, start } from '../server'
import * as db from '../db'
import config from '../config'

describe('server', () => {
  describe('getSchemaTypes', () => {
    it('should return schemaTypes for specified types', async () => {
      const schemaTypes = await getSchemaTypes(types)
      expect(schemaTypes).toBeTruthy()
    })
  })
})
