import { ForbiddenError, NotFoundError, Session } from '../domains'
import { UsersStore } from '../stores'

interface GetUserStores {
    users: UsersStore
}

export const GetUser = ({ users }: GetUserStores, currentSession: Session) => {
    return async (userID: number) => {
        if (currentSession.userID !== userID) {
            throw new ForbiddenError('Can not access other user info.')
        }
        const user = await users.get(userID)
        if (!user) {
            throw new NotFoundError('user not found.')
        }

        return user
    }
}
