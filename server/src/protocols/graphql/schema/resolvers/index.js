import * as usecases from '../../../../usecases'

import { UserInputError } from 'apollo-server-express'
const resolvers = {
    Query: {
        user: async (_source, { id }, { stores, session }) => {
            const userID = parseInt(id, 10)
            if (isNaN(userID)) {
                throw new UserInputError('id must be parsable to an int.')
            }
            return await usecases.users.GetUser(stores, session)(id)
        },
        products: async (_source, _input, { stores }) => {
            return await usecases.products.ListProducts(stores)()
        },
    },
    Mutation: {
        authenticate: async (_source, { email, password }, context) => {
            const { stores } = context
            const session = await usecases.auth.AuthenticateUser(stores)(email, password)
            if (session) {
                context.session = session
            }

            return session
        },
        refreshSession: async (_source, { accessToken, refreshToken }, context) => {
            const { stores } = context
            const session = await usecases.auth.RefreshSession(stores)(accessToken, refreshToken)
            context.session = session
            return session
        },
    },
}

module.exports = resolvers
