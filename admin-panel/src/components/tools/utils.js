
const ACCESS_TOKEN_NAME = "accessToken"
// const REFRESH_TOKEN_NAME = "refreshToken"

export function setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_NAME, token)
}

export function removeAcssesToken(token) {
    localStorage.remove(ACCESS_TOKEN_NAME, token)

}