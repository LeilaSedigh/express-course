import User from "../models/user.mjs";
import { BadRequestError } from "../utils/errors.mjs";

class AuthController {
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
        let user;
        try {
            user = await User.create({ username, password })
        } catch (error) {
            if(error.original.code==="ER_OUP_ENTRY"){
                throw new BadRequestError("Username is duplicated!")
            }
        }
        res.json(user)
    }
}

export default new AuthController()