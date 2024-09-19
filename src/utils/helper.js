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


module.exports = {
	hashPassword,
	compareHash
};
