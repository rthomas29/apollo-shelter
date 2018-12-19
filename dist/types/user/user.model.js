"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserSchema = exports.roles = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roles = {
  admin: 'admin',
  employee: 'employee'
};
exports.roles = roles;

const UserSchema = _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.keys(roles),
    required: true,
    default: roles.admin
  }
}, {
  timestamps: true
});

exports.UserSchema = UserSchema;
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  _bcrypt.default.hash(this.password, 8, (err, hash) => {
    this.password = hash;
    next();
  });
});

const User = _mongoose.default.model('user', UserSchema);

var _default = User;
exports.default = _default;