export const articleSchema = {
    body: {
        type: 'object',
        require: true,
        properties: {
            title: {
                type: "string",
                require: true,
                minLength: 5,
                maxLength: 255,
            },
            text: {
                type: "string",
                require: true,
            }
        }
    }
}