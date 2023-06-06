const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, 'secret');
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Not Authorized');
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send('Invalid login credentials');
    } else {
      const token = await user.generateAuthToken();
      res.json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findOne({ _id: req.params.id });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User Deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.redirect('/');
    const token = null;
    res.json({ user, token });
    res.status(200).send('Logout successful');
  } catch (error) {
    res.status(421).json({ message: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const listUsers = await User.find({});
    res.render('/index', {
      user: listUsers,
    });
  } catch (error) {
    res.status(421).json({ message: error.message });
  }
};
