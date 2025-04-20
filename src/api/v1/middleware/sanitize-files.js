const fs = require("fs");

const sanitizeFiles =
  (zodValidator, multiple = false) =>
  (req, res, next) => {
    try {
      const dataToValidate = multiple ? req.files : req?.files?.[0];
      const { error, data } = zodValidator.safeParse(dataToValidate);

      if (error) {
        if (dataToValidate) {
          for (const file of Array.isArray(dataToValidate)
            ? dataToValidate
            : [dataToValidate]) {
            fs.rmSync(file.path);
          }
        }

        return res.status(400).json({ error });
      }

      req[multiple ? "files" : "file"] = data;
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };

module.exports = sanitizeFiles;
