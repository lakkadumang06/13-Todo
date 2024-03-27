var jwt = require('jsonwebtoken');

// exports.check_token = async (req, res, next) => {
//     jsw.verify(req.headers.authorization,"cdmi",next);
// }
exports.check_token = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decode = jwt.verify(token, "cdmi");
            if (decode) {
                next();
            }
            else {
                return res.status(401).json({
                    status: "Error !!!",
                    message: "auth token not found"
                })
            }
        }
        else {
            return res.status(401).json({
                status: "Error !!!",
                message: "auth token not found"

            })
        }
    }
    else {
        return res.status(401).json({
            status: "Error !!!",
            message: "auth token not found"
        })
    }
}