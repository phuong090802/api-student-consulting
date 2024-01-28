import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      default: () => nanoid(),
    },
    status: {
      type: Boolean,
      default: true,
    },
    expires: {
      type: Date,
      default: new Date(
        Date.now() + process.env.RF_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
      ),
    },
    branch: {
      type: String,
      required: [true, 'Thiếu thông tin nhánh token'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Thiếu thông tin người dùng'],
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // index: { expires: 15 },
      index: { expires: '7d' },
    },
  },
  { collection: 'refresh-tokens' }
);

refreshTokenSchema.methods.generateRefreshToken = async function () {
  this.status = false;
  await this.save();
  const refreshToken = new RefreshToken({
    branch: this.branch,
    owner: this.owner,
  });
  return await refreshToken.save();
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
