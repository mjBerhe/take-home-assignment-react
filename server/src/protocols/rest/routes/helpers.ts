import { NextFunction, Request, Response } from 'express'

type RequestHandler = (req: Request, res: Response) => Promise<void>

export function asyncHandler(handler: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        handler(req, res).catch(err => {
            next(err)
        })
    }
}
