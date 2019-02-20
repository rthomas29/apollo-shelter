import root from '../index'
import * as server from '../server'

jest.mock('../server')

describe('index', () => {
  it('should call start', () => {
    const spy = jest.spyOn(server, 'start')
    require('../index')
    expect(spy).toHaveBeenCalled()
  })
})
