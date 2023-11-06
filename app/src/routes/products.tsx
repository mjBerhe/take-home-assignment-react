import React from "react"
import { Navigate } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { isExpired } from "./login"

const GET_PRODUCTS = gql`
  query Products {
    products {
      currency
      title
      price
      id
      description
    }
  }
`

interface Product {
  id: number
  title: string
  description: string
  price: number
  currency: string
}

const Products: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (isExpired(localStorage.getItem("token"))) {
    return <Navigate to="/login" replace={true} />
  }

  if (loading) {
    return <div>...loading</div>
  }

  if (!error && data) {
    const products = data.products as Product[]

    return (
      <div className="bg-[#f4f4f4] min-h-screen w-full pt-12 px-12">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Products</span>
          <div className="flex flex-col gap-y-4 mt-4">
            {products.map(p => (
              <div key={p.id} className="flex flex-col">
                <span>{p.title}</span>
                <span>{p.description}</span>
                <span>
                  {p.price} {p.currency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Button className="w-[200px]" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f4f4f4] min-h-screen w-full pt-12">
      <div className="flex flex-col">No Products</div>
      <div className="mt-12">
        <Button className="w-[200px]" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Products
