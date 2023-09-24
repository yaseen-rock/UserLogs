const User = require('../models/User');
const moment = require('moment');

exports.getHome = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const loginTime = moment(user.loginTime);
  const sessionDuration = moment.duration(moment().diff(loginTime)).humanize();

  res.json({
    message: `Welcome, ${user.name}`,
    previousLogins: [{ timestamp: loginTime.format('YYYY-MM-DD HH:mm:ss'), duration: sessionDuration }],
    messages: user.messages,
  });
};

exports.addMessage = async (req, res) => {
  const userId = req.session.userId;
  const { message } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.messages.push(message);
  await user.save();

  res.json({ message: 'Message added successfully' });
};
