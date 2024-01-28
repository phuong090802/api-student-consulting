export const sendToken = async (res, token, refreshToken, user) => {
  const options = {
    expires: refreshToken.expires,
    httpOnly: true,
    path: '/api/auth',
    secure: true,
    // sameSite: 'None',
  };
  res.cookie('refreshToken', refreshToken.token, options).json({
    success: true,
    user,
    token,
  });
};

export const clearToken = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/api/auth',
    secure: true,
    // sameSite: 'None',
  });
};
