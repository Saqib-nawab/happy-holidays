"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
// routes
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // to parse cookies from request
app.use(express_1.default.urlencoded({ extended: true }));
// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Specify your frontend origin here form where request could be accepted (authorisation etc.)
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
