import { IS_PRODUCTION } from "../constants/constants.js";

export default function globalErrorHandler(err, req, res, next) {
  const response = {
    success: false,
    message: err.message,
    errors: err.errors,
    data: err.data,
  };

  if (!IS_PRODUCTION) {
    response.stack = err.stack;
    response.statusCode = err.statusCode;
  }

  res.status(err.statusCode || 500).json(response);
}
