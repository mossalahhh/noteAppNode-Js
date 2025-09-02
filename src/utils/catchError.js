export const catchError = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch((error) => {
      // invoke global error handling
      return next(error);
    });
  };
};
