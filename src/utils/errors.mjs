 export class NotFoundError extends Error {
    status = 404;

    constructor(message = "Not Found"){
        super(message)
    }
}

 export class NotAuthorizeError extends Error {
    status = 401;

    constructor(message = "Not AuthorizeError"){
        super(message)
    }
}

 export class BadRequestError extends Error {
    status = 400;

    constructor(message = "Bad Request Error"){
        super(message)
    }
}