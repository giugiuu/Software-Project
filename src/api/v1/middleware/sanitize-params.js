const sanitizeParams = (zodValidator) => (req, res, next) => {
  try {
    const validate = zodValidator.parse(req.params);

    req.params = validate;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = sanitizeParams;
