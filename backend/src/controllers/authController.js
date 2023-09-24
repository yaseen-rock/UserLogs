const User = require('../models/User');

exports.login = async (req, res) => {
  const { name, email, mobile } = req.body;

  
  if (name === 'admin' && email === 'admin@admin.com' && mobile === '0000000000') {
    const users = await User.find();
    console.log('Admin logged in');
    return res.json(users);
  }

  
  let user = await User.findOne({ name, email, mobile });

  if (!user) {
    user = new User({ name, email, mobile });
    await user.save();
    console.log(`User ${name} registered`);
  }

 
  user.loginTime = new Date();
  await user.save();

  req.session.userId = user._id;
  console.log(`User ${name} logged in`); 
  res.json({ message: 'Login successful' });
};

exports.logout = (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    console.log('Unauthorized logout attempt'); 
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.session.destroy((err) => {
    if (err) {
      console.log('Logout failed:', err); 
      return res.status(500).json({ message: 'Logout failed' });
    }
    console.log('User logged out'); 
    res.json({ message: 'Logout successful' });
  });
};
