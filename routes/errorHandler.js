const errorHandler = (error, req, res, next) => {
  console.error("error :", error);

  const code = error.code || 400;

  res.status(code).json({
    err: error.name === "Error" ? error.message : error.name,
  });
};

module.exports = errorHandler;
