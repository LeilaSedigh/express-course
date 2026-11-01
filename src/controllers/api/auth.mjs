import User from "../../models/user.mjs";
import { BadRequestError, UnAuthorizeError } from "../../utils/errors.mjs";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { generateAccessessToken, generateRefreshToken } from "../../utils/token.mjs";

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError("Username and Password are required!")
        }

        const user = await User.scope("withPassword").findOne({ where: { username } })

        if (!user) {
            throw new BadRequestError("Credential Error")
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestError("Credential Error")
        }

        user.setDataValue("password", undefined)

        const accessToken = generateAccessessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.json({
            ...user.dataValues,
            accessToken,
            refreshToken
        })

    }

    user(req, res) {
        return res.json(req.user)
    }
    async getAccessessToken(req, res, next) {
        const { refreshToken } = req.body

        jwt.verify(refreshToken, process.env.JWT_SECRET, async (error, payload) => {
            if (error) {
                next (new UnAuthorizeError(error));
            }

            const user = await User.findByPk(payload.id)

            const accessToken = generateAccessessToken(user)
            res.json({
                accessToken,
            })
        });
    }

}


export default new AuthController()