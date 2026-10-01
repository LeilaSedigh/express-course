import User from "../models/user.mjs";
import { BadRequestError } from "../utils/errors.mjs";
import bcrypt from 'bcrypt'

class AuthController {
    loginPage(req, res) {
        if (req.user) {
            return res.redirect("/")
        }
        res.render('auth/login', {
            title: "Login"
        })
    }
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError("Username and Password are required!")
        }

        const user = await User.findOne({ where: { username } })
        if (!user) {
            throw new BadRequestError("Credential Error")
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestError("Credential Error")
        }

        user.setDataValue("password", undefined)

        req.session.user = user;

        res.json(user)
    }

    registerPage(req, res) {
        res.render('auth/register', {
            title: "Register"
        })
    }
    async register(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError("Username and Password are required!")
        }
        try {
            const hashPassword = bcrypt.hashSync(password, 12)

            const user = await User.create({ username, password: hashPassword });
            res.json(user)
            user.setDataValue("password", undefined)

        } catch (error) {
            if (error?.original?.code === "ER_DUP_ENTRY") {
                throw new BadRequestError("Username is duplicated!")
            }
            throw error;

        }

    }

    logout(req, res) {
        if (!req.user) {
            return res.redirect("/")
        }
        req.session.destroy(error => {
            if (!error) {
                res.redirect(req.headers.referer)
            }
            else {
                throw error
            }
        })
    }
}
export default new AuthController()