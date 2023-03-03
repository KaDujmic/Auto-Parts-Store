const callbackErrorHandler = (callback) => {
  return (req, res, next) => callback(req, res, next).catch(next);
};

const errorMiddleware = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === 'ValidationError') {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === 'AuthorizationError') {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === 'NotFoundError') {
    res.status(err.statusCode).json({ message: 'Requested resource could not be found. Please review the submitted parameters.' });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'Item has to be unique' });
  } else {
    console.error(err);
    res.status(err.statusCode ?? 500).json({
      message: err.message ?? 'Oops, something went wrong!'
    });
  }
};

module.exports.errorMiddleware = errorMiddleware;
module.exports.callbackErrorHandler = callbackErrorHandler;
