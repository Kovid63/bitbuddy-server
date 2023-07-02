const { hashPassword } = require('../functions/hashPassword');
const { tokenGenerator } = require('../functions/tokenGenerator');
const User = require('../models/User');
const cookie = require('cookie');

async function signupHandler(req, res) {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(409).json(
                {
                    meta: {
                        code: 409,
                        message: 'Email already registered'
                    },
                    error: {
                        code: 'RESOURCE_CONFLICT',
                        message: 'The email provided is already registered with us please login.'
                    }
                }
            );
        }

        const newUser = new User({
            username: 'req.body.username',
            phone_number: 'req.body.phone_number',
            email: req.body.email,
            password: await hashPassword(req.body.password)
        });

        const token = tokenGenerator({ email: req.body.email });

        await newUser.save().then((result, err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const dataForUser = { ...result._doc };

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
        });

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

module.exports = { signupHandler };