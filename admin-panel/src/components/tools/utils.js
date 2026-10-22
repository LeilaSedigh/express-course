
const ACCESS_TOKEN_NAME = "accessToken"

export function setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_NAME, token)
}

export function getAccessToken() {
   return localStorage.getItem(ACCESS_TOKEN_NAME)
}

export function removeAcssesToken() {
    localStorage.remove(ACCESS_TOKEN_NAME)

}