import { RequestHandler } from 'express'
import { ForbiddenError } from '../../../domains'

export default function isAuthenticated(): RequestHandler {
    return async function verifyRequestIsAuthenticated(req, res, next) {
        const session = req.context.session
        if (!session) {
            return next(new ForbiddenError('Missing Authorization'))
        }
        return next()
    }
}
