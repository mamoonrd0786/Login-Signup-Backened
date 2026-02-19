const { validationResult } = require("express-validator");

const validate = async function (req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(300).json(
            { message: result.array() }
        )
    }
    next();
}

module.exports = { validate };