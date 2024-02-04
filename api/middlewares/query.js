
export const setDefaultPaginationParams = (req, res, next) => {
  req.query.page = 1;
  req.query.size = 5;
  next();
};

export const setUserSearchFieldsParams = (req, res, next) => {
  req.query.fields = ['fullName', 'email', 'phoneNumber',];
  next();
};
