import mongoose from 'mongoose';

const counsellorSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Thiếu thông tin phòng ban'],
    ref: 'Department',
  },
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // lúc mới tạo, không có lĩnh vực
      // required: [true, 'Thiếu thông tin lĩnh vực'],
      ref: 'Field',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Counsellor = mongoose.model('Counsellor', counsellorSchema);
export default Counsellor;
