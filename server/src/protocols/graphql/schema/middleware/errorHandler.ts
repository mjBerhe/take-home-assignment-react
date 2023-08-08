import { ApolloError } from 'apollo-server-express'
import { IMiddleware } from 'graphql-middleware'

const errorHandler: IMiddleware = async (resolve, root, args, context, info) => {
    try {
        return await resolve(root, args, context, info)
    } catch (err) {
        if (err.code) {
            throw new ApolloError(err.message, err.code)
        }

        console.error(`Unhandled ${err.constructor.name} error occurred`)
        console.error(err.stack.toString())
        throw err
    }
}

export default errorHandler
