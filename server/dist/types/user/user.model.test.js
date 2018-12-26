"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _crud = _interopRequireDefault(require("../../db/crud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const comparePassword = (plainPassword, hash = 8) => new Promise(async (resolve, reject) => {
  _bcrypt.default.compare(plainPassword, hash, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

describe('User', () => {
  it('should create User documents', async () => {
    const newUser = {
      email: 'newUser@user.com',
      password: 'password123',
      role: 'employee'
    };
    const savedUser = await _crud.default.createUser(newUser);
    const savedUserPassword = await comparePassword(newUser.password, savedUser.password);
    expect(savedUserPassword).toBe(true);
  });
});