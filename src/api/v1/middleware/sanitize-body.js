const sanitizeBody = (zodValidator) => (req, res, next) => {
  try {
    const validate = zodValidator.parse(req.body);

    req.body = validate;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = sanitizeBody;
