const { tokenVerify } = require("../functions/tokenVerify");

async function verifyTokenHandler(req, res) {
    try {
        const cookieHeader = req.headers.cookie;
        const cookies = {};

        if (!cookieHeader) {
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

        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            cookies[name] = decodeURIComponent(value);
        });
        
        const details = await tokenVerify(cookies.authToken);
        
        if(details.code){
            if(details.code === 1){
                return res.status(401).json({
                    meta: {
                        code: 401,
                        message: 'Unauthorized'
                    },
                    error: {
                        code: 'UNAUTHORIZED',
                        message: `We're sorry, but you are not authorized to access the requested resource. This may be due to missing or invalid authentication credentials.`
                    }
                })
            }
            if(details.code === 2){
                return res.status(401).json({
                    meta: {
                        code: 401,
                        message: 'Unauthorized'
                    },
                    error: {
                        code: 'UNAUTHORIZED',
                        message: `Your session has expired. Please log in again to continue.`
                    }
                })
            }
        }

        res.status(200).json({
            meta: {
                code: 200,
                message: 'Success'
            },
            data: details
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { verifyTokenHandler }