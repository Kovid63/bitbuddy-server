const { passwordCheck } = require("../functions/passwordCheck");
const { tokenGenerator } = require("../functions/tokenGenerator");
const User = require("../models/User");
const cookie = require('cookie');

async function loginHandler(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
                meta: {
                    code: 400,
                    message: 'Bad Request'
                },
                error: {
                    code: 'BAD_REQUEST',
                    message: `Sorry, we couldn't find any user`
                }
            })
        }

        const compareResult = await passwordCheck(req.body.password, user.password);

        if (!compareResult) {
            return res.status(401).json({
                meta: {
                    code: 401,
                    message: 'Unauthorized'
                },
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Email/Password is incorrect'
                }
            })
        }

        const token = tokenGenerator({ email: req.body.email });
        const dataForUser = { ...user._doc };

        delete dataForUser.password;

        res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            priority: 'medium',
            maxAge: 60 * 60 * 24 * 7
        })).status(200).json(
            {
                meta: {
                    code: 200,
                    message: 'Success'
                },
                data: dataForUser
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                meta: {
                    code: 500,
                    message: error
                },
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message
                }
            }
        );
    }
}

module.exports = { loginHandler }