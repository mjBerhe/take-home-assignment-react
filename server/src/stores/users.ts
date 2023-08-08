import { Knex } from 'knex'
import { User } from '../domains'

const TABLE_NAME = 'users'

interface Row {
    id: number
    email: string
    password: string
}

class UsersStore {
    private knex: Knex

    constructor(knex: Knex) {
        this.knex = knex
    }

    async get(id: number): Promise<User | undefined> {
        const row = await this.knex<Row>(TABLE_NAME).where({ id }).first()
        return row && this.toDomain(row)
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const row = await this.knex<Row>(TABLE_NAME).whereRaw(`lower(email) = ?`, email.toLowerCase()).first()
        return row && this.toDomain(row)
    }

    private toDomain(row: Row): User {
        return {
            id: row.id,
            email: row.email,
            password: row.password,
        }
    }
}

export default UsersStore
