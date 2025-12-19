"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logout = exports.login = exports.register = void 0;
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const user_model_1 = require("./user.model");
const register = async (req, res) => {
    const data = auth_dto_1.registerSchema.parse(req.body);
    const user = await (0, auth_service_1.registerUser)(data.name, data.email, data.password);
    res.status(201).json({
        message: "User registered",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};
exports.register = register;
const login = async (req, res) => {
    const data = auth_dto_1.loginSchema.parse(req.body);
    const { user, token } = await (0, auth_service_1.loginUser)(data.email, data.password);
    res
        .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        .json({
        message: "Login successful",
        user,
        token
    });
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
const me = async (req, res) => {
    const user = await user_model_1.User.findById(req.userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};
exports.me = me;
//# sourceMappingURL=auth.controller.js.map