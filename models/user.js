import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import ErrorHandler from '../utils/ErrorHandler.js';
import RefreshToken from './refreshToken.js';
import Counsellor from './counsellor.js';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập họ và tên'],
    maxLength: [50, 'Tên của bạn không được vượt quá 50 ký tự'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Vui lòng nhập email'],
    validate: {
      validator: function (v) {
        const normalizeEmail = v.toLowerCase();
        return validator.isEmail(normalizeEmail);
      },
      message: 'Vui lòng nhập địa chỉ email hợp lệ',
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Vui lòng nhập số điện thoại'],
    validate: {
      validator: function (v) {
        const pattern =
          /^(0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/;
        return pattern.test(v);
      },
      message: 'Vui lòng nhập số điện thoại hợp lệ',
    },
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [6, 'Mật khẩu của bạn phải ít nhất 6 ký tự'],
    select: false,
  },
  avatar: {
    blobId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    uppercase: true,
    default: 'USER',
    enum: {
      values: ['USER', 'COUNSELLOR', 'DEPARTMENT_HEAD', 'SUPERVISOR', 'ADMIN'],
      message: '{VALUE} không được hổ trợ',
    },
  },
  occupation: {
    type: String,
    trim: true,
    enum: {
      values: ['Học sinh', 'Sinh viên', 'Cựu sinh viên', 'Phụ huynh', 'Khác'],
      message: '{VALUE} không được hổ trợ',
    },
    // kiểm tra nếu role là user thì bắt buộc
    validate: {
      validator: function (v) {
        return !(this.role === 'USER' && validator.isEmpty(v));
      },
      message: 'Vui lòng nhập nghề nghiệp',
    },
  },
  resetPassword: {
    token: {
      type: String,
    },
    expires: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME_IN_SECONDS,
  });
};

userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = new RefreshToken({
    branch: nanoid(),
    owner: this._id,
  });
  return await refreshToken.save();
};

userSchema.methods.getUserInfo = async function () {
  const counsellor = await Counsellor.findOne({ user: this._id }).populate(
    'department',
    'departmentName'
  );

  return {
    _id: this._id,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    avatar: this.avatar.url || null,
    role: this.role,
    occupation: this.occupation,
    departmentName: counsellor ? counsellor.department.departmentName : null,
  };
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const { password, confirmPassword } = JSON.parse(this.password);
  if (!validator.equals(password, confirmPassword)) {
    next(new ErrorHandler(400, 'Mật khẩu không khớp', 4003));
  }
  this.password = await bcrypt.hash(password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
