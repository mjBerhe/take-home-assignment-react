import {
    UnauthenticatedError,
    ForbiddenError,
    SessionExpiredError,
    NotFoundError,
    BadInputError,
} from '../../../domains'
import { NextFunction, Request, Response } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BadInputError) {
        return res.status(400).json({ code: err.code, message: err.message }).end()
    }

    if (err instanceof UnauthenticatedError) {
        return res.status(401).json({ code: err.code, message: err.message }).end()
    }

    if (err instanceof ForbiddenError) {
        return res.status(403).json({ code: err.code, message: err.message }).end()
    }

    if (err instanceof SessionExpiredError) {
        return res.status(403).json({ code: err.code, message: err.message }).end()
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ code: err.code, message: err.message }).end()
    }

    return next(err)
}
