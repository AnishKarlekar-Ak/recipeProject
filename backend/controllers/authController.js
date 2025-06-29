// controllers/authController.js
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.user = {
    _id: user._id,
    name: user.name,
    role: user.role
  };

  res.status(200).json({ message: 'Login successful', user: req.session.user });
};
