import jwt from "jsonwebtoken";
import { BadRequestError } from "../utils/errors.mjs";

export default (req, res, next) => {
  if (req.header.authorization) {

    const token = req.header.authorization
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        throw new BadRequestError(error)
      }

      req.user = payload
      next()
    })

  } else {
    req.user = req.session.user;

    next();
  }

};