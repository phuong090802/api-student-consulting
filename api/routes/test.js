import express from 'express';

import User from '../../models/user.js';
import QueryAPI from '../../utils/QueryAPI.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import {
  setDefaultPaginationParams,
  setUserSearchFieldsParams,
} from '../middlewares/query.js';
import paginateData from '../../utils/pagination.js';
// import Department from '../../models/department.js';
// import Counsellor from '../../models/counsellor.js';

const router = express.Router();

router.post('/departments',)


// router.use(setDefaultPaginationParams, setUserSearchFieldsParams);

// solution
// 1. virtual field department name
// 2. find all userId in counsellor then find user by id in this array
// 3. change ref from counsellor -> user to user -> counsellor
// 4. merge counsellor to user
// 5. use map in users (n record per page not effective performance of application)

// router.get(
//   '/users',
//   catchAsyncErrors(async (req, res, next) => {
//     const queryAPI = new QueryAPI(User.find(), req.query)
//       .search()
//       .filter()
//       .sort();

//     // const currentPage = +req.query.page;

//     let queriedUsers = await queryAPI.query;
//     // total users
//     const totalUsers = queriedUsers.length;
//     // total Page
//     // const totalPages = Math.ceil(totalUsers / +req.query.size);

//     queriedUsers = await queryAPI.pagination().query.clone();

//     const userInfos = await Promise.all(
//       queriedUsers.map((user) => user.getUserInfo())
//     );

//     const {
//       data: users,
//       page,
//       totalPages,
//     } = paginateData(totalUsers, req.query.page, req.query.size, userInfos);

//     res.json({
//       users,
//       page,
//       totalPages,
//     });
//   })
// );

// router.post('/departments', async (req, res, next) => {
//   const { departmentName } = req.body;
//   await Department.create({ departmentName });
//   res.json({
//     success: true,
//     message: 'Thêm khoa thành công',
//   });
// });

// router.post(
//   '/departments/:departmentId/users/:userId',
//   async (req, res, next) => {
//     const { departmentId, userId } = req.params;
//     await Counsellor.create({
//       department: departmentId,
//       user: userId,
//     });

//     res.json({
//       success: true,
//       message: 'Tạo thông tin tư vấn viên thành công',
//     });
//   }
// );

export default router;
