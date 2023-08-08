import { Knex } from 'knex'
import { Product } from '../domains'

const TABLE_NAME = 'products'

interface Row {
    id: number
    title: string
    description: string
    price: number
    currency: string
}

class ProductsStore {
    private knex: Knex

    constructor(knex: Knex) {
        this.knex = knex
    }

    async list(): Promise<Product[]> {
        const rows = await this.knex<Row>(TABLE_NAME).orderBy('id', 'asc')
        return rows.map(this.toDomain)
    }

    private toDomain(row: Row): Product {
        return {
            ...row,
        }
    }
}

export default ProductsStore
