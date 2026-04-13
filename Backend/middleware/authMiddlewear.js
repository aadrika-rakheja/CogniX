const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddlewear = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
   
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select("_id role email");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: user not found"
            });
        }

        req.user = {
            id: user._id,
            role: user.role,
            email: user.email
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddlewear;