const userModel = require("../models/user-modal");
const bcrypt = require("bcrypt");
const { hashPassword, compareHash } = require("../utils/helper");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
	try {
		const { username, email, password, role } = req.body;
		const hashedPassword = await hashPassword(password);

		const user = await userModel.create({
			username,
			email,
			password: hashedPassword,
			role: role || "passenger",
		});

		res.status(200).json({
			status: "success",
			user,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const signIn = async (req, res, next) => {
	const { email, password } = req.body;

	console.log(password);

	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "User not found",
			});
		}

		const isMatched = await compareHash(password, user.password);

        console.log("isMatched" , isMatched)

		if (!isMatched) {
			return res.status(401).json({
				status: "error",
				message: "Invalid credentials",
			});
		}

		let accessToken = jwt.sign(
			{
				data: {
					userid: user._id,
					role: user.role,
					email: user.email,
				},
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);


        let refreshToken = null;

        if(user.role === 'admin'){
             refreshToken = jwt.sign(
                {
                    data: {
                        userid: user._id,
                        role: user.role,
                        email: user.email,
                    },
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
        }
       return res.status(200).json({
            status : "success",
            message: "Login successful",
            accessToken,
            refreshToken
        })

	} catch (error) {}
};

module.exports = {
	signUp,
	signIn,
};
