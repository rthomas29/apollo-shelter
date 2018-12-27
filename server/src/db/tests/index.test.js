import mongoose from 'mongoose'
import connect from '../index'

describe('connect', () => {
  afterEach(() => {
    mongoose.disconnect()
  })
  it('should return a mongoose connection', () => {
    const spy = jest.spyOn(mongoose, 'connect')
    connect()
    expect(spy).toHaveBeenCalled()
  })
})
