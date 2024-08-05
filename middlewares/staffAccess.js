function allStaffCanAccessMiddleware(req, res, next) {
  const currentUser = req.decoded;
  const role = currentUser.role;
  const allowedRoles = ['admin', 'superAdmin'];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'User is not a staff',
    });
  }

  next();
}

module.exports = {
  allStaffCanAccessMiddleware
}