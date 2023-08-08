import { ProductsStore } from '../stores'

interface ListProductsStores {
    products: ProductsStore
}

export const ListProducts = ({ products }: ListProductsStores) => {
    return async () => {
        return await products.list()
    }
}
