const unknownRoute = (req, res, next) => {
  next(new Error("Unknown Endpoint"));
};

module.exports = unknownRoute;
