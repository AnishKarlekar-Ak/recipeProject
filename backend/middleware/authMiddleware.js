// middleware/authMiddleware.js

export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.session?.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden. You do not have the required permissions.' });
    }
  };
};
