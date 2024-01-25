import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Vui lòng nhập tên khoa'],
    maxLength: [100, 'Tên khoa không được vượt quá 100 ký tự'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
