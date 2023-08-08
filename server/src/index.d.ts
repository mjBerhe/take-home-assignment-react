import { Session } from './domains'
declare module 'express-serve-static-core' {
    interface Request {
        context: {
            session?: Session
        }
    }
}
