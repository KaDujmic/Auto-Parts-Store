class ValidationError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class AuthorizationError extends Error {
  constructor (message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports.ValidationError = ValidationError;
module.exports.AuthorizationError = AuthorizationError;
module.exports.NotFoundError = NotFoundError;
