import { RequestHandler } from 'express'
import { SessionsStore, UsersStore } from '../../../stores'
import * as usecases from '../../../usecases'

interface Stores {
    users: UsersStore
    sessions: SessionsStore
}

export default function authenticateRequest(stores: Stores): RequestHandler {
    return async function authenticationMiddleware(req, res, next) {
        const authorization = req.headers.authorization
        const match = authorization && authorization.match(/Bearer (.*)/)
        if (match) {
            try {
                const session = await usecases.auth.AuthenticateSession(stores)(match[1])
                req.context.session = session
            } catch (err) {
                return next(err)
            }
        }

        return next()
    }
}
