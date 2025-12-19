class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something Went Wrong!!!",
    data = {},
    errors = [],
    stack = ""
  ) {
    super(message);

    this.success = false;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.defineProperty(this, "stack", {
      value: this.stack,
      enumerable: true,
    });
  }
}

export default ApiError;
