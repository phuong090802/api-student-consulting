import express from 'express';

import Department from '../../models/department.js';
import Counsellor from '../../models/counsellor.js';

const router = express.Router();

router.post('/departments', async (req, res, next) => {
  const { departmentName } = req.body;
  await Department.create({ departmentName });
  res.json({
    success: true,
    message: 'Thêm khoa thành công',
  });
});

router.post(
  '/departments/:departmentId/users/:userId',
  async (req, res, next) => {
    const { departmentId, userId } = req.params;
    await Counsellor.create({
      department: departmentId,
      user: userId,
    });

    res.json({
      success: true,
      message: 'Tạo thông tin tư vấn viên thành công',
    });
  }
);

export default router;
