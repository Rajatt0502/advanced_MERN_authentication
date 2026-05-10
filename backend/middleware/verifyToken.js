import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - No token provided",
			});
		}

		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decoded.userId;

		next();
	} catch (error) {
		console.error("Error in verifyToken:", error.message);

		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Token expired",
			});
		}

		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				success: false,
				message: "Invalid token",
			});
		}

		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};