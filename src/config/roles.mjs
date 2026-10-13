export const ROLE_HIERARCHY = {
    ADMIN: ["MODERATOR", "USER", "WRITER"],
    MODERATOR: ["USER", "WRITER"],
    WRITER: ["USER"],
    USER: []
}