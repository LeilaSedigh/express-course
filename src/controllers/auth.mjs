import User from "../models/user.mjs";
import { BadRequestError } from "../utils/errors.mjs";
import bcrypt from 'bcrypt'

class AuthController {
    loginPage(req, res) {
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

        if (user.password !== password) {
            throw new BadRequestError("Credential Error")
        }


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
            const hashPassword = bcrypt.hashSync(password , 12)
            const user = await User.create({ username, password });
            res.json(user)

        } catch (error) {
            if (error?.original?.code === "ER_DUP_ENTRY") {
                throw new BadRequestError("Username is duplicated!")
            }
            throw error;

        }
    }
}
export default new AuthController()