export default function asyncHandler(run) {
  return async (req, res, next) => {
    Promise.resolve(run(req, res, next)).catch(next);
  };
}
