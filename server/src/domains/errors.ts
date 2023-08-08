export class UnauthenticatedError extends Error {
    code = 'UNAUTHENTICATED'
}

export class ForbiddenError extends Error {
    code = 'FORBIDDEN'
}

export class SessionExpiredError extends Error {
    code = 'SESSION_EXPIRED'
}

export class NotFoundError extends Error {
    code = 'NOT_FOUND'
}

export class BadInputError extends Error {
    code = 'BAD_INPUT'
}
