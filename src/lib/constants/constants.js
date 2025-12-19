import ApiError from "../helpers/apiError.js";
const environment = process.env.NODE_ENV;

if (
  (environment !== "dev" || environment === "prod") &&
  (environment === "dev" || environment !== "prod")
) {
  throw new ApiError(
    500,
    "NODE_ENV should be only dev or prod but you have provided: " + environment
  );
}

export const IS_PRODUCTION = process.env.NODE_ENV === "dev" ? false : true;
