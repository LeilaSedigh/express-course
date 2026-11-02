import winston from 'winston'
import 'winston-mongodb';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost:27007/blog',
            collection: 'log'
        })
    ],
})

export function log(data) {
    logger.log({ level: "info", ...data })
}