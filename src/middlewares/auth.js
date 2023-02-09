import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            res.status(401).json({ msg: 'Unauthorized User' });
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Unauthorized User' });
    }
};
