import jwt from "jsonwebtoken";
import { UnAuthorizeError } from "../utils/errors.mjs";

export default (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        req.user = req.session?.user;
        return next();
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new UnAuthorizeError());
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return next(new UnAuthorizeError());
        }

        req.user = payload;
        return next();
    });
};
