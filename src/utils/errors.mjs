 export class NotFoundError extends Error {
    status = 404;

    constructor(message = "Not Found"){
        super(message)
    }
}

 export class UnAuthorizeError extends Error {
    status = 401;

    constructor(message = "Not AuthorizeError"){
        super(message)
    }
}

 export class ForbiddenError extends Error {
    status = 403;

    constructor(message = "ForbiddError"){
        super(message)
    }
}

 export class BadRequestError extends Error {
    status = 400;

    constructor(message = "Bad Request Error"){
        super(message)
    }
}