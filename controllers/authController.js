const { ValidationError, AuthorizationError } = require('../utils/errors');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, status_code, res, req) => {
  // Sign the token with user ID
  const token = signToken(user.id);
  res.status(status_code).json({
    status: 'success',
    token,
    user
  });
};

const createPassword = async function (
  candidate_password,
  user_password
) {
  if (process.env.NODE_ENV === 'development') {
    return await candidate_password === user_password;
  }
  return await bcrypt.compare(candidate_password, user_password);
};

exports.login = async (req, res) => {
  // 1) Destructure email and password from body
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('Please enter email and password');
  }
  // 2) Find the current user that wants to log in
  const current_user = await user.findOne({ where: { email } });
  if (!current_user || (await createPassword(current_user.password, password) === false)) {
    throw new ValidationError('Incorrect email or password!');
  }
  // 3) Create jwt and send the response
  createSendToken(current_user, 200, res, req);
};

exports.isLoggedIn = async (req, res, next) => {
  // 1) Getting the token and check if there is a Bearer or Cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) { throw new AuthorizationError('You are not logged in. Please log in!'); }

  // 2) Verification of the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const current_user = await user.findByPk(decoded.id);
  if (!current_user) { throw new ValidationError('The user no longer exists!'); }

  // 4) Set local storage and req.user to current_user
  req.user = current_user.dataValues;
  res.locals.user = current_user.dataValues;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roleName)) {
      return res
        .status(403)
        .json('You do not have permission to access this route!');
    }
    next();
  };
};
