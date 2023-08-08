import crypto from 'crypto'

export const generateToken = () => {
    return crypto.randomBytes(24).toString('hex')
}
