const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (plainPassword) => {
	const hash = await bcrypt.hash(plainPassword, 10);
	return hash;
};

const compareHash = async (plainPassword, hashPass) => {
	const isMatch = await bcrypt.compare(plainPassword, hashPass);
	return isMatch;
};

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(403).json({
			status: "error",
			message: "No token provided",
		});
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		return res.status(403).json({
			status: "error",
			message: "Token missing",
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.data;
		next();
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

module.exports = {
	hashPassword,
	compareHash,
	verifyToken,
};
