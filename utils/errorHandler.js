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
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(err);
    res.status(err.statusCode ?? 500).json({
      message: err.message ?? 'Oops, something went wrong!'
    });
  }
};

module.exports.errorMiddleware = errorMiddleware;
module.exports.callbackErrorHandler = callbackErrorHandler;
