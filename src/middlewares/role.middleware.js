exports.allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(200).json({ message: "Access denied" })
        }
        next()
    }
}

// module.exports = {allowRoles};