import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Vui lòng nhập tên lĩnh vực'],
    maxLength: [100, 'Tên lĩnh vực không được vượt quá 100 ký tự'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Field = mongoose.model('Field', fieldSchema);
export default Field;
