export * from './errors'

// Combined into a single file for convenience
export interface User {
    id: number
    email: string
    password: string // Plain text password for convenience never do this in a production app ;)
}

export interface Session {
    id: number
    accessToken: string
    refreshToken: string
    expiresAt: Date
    userID: number
}

export interface Product {
    id: number
    title: string
    description: string
    price: number
    currency: string
}
