import jwt from 'jsonwebtoken'

export function generateAccessessToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "100s"
        }
    )
}

export function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1000s"
        }
    )
}