import React from "react"
import { LoginBox } from "../components/LoginBox"
import { Navigate } from "react-router-dom"

export const isExpired = (token: string | null) => {
  if (token) {
    return false
  }
  return true
}

const Login: React.FC = () => {
  const token = localStorage.getItem("token")
  if (!isExpired(token)) {
    return <Navigate to="/products" replace={true} />
  }

  return (
    <div className="bg-[#f4f4f4] min-h-screen w-full pt-12">
      <div className="flex flex-col">
        <LoginBox />
      </div>
    </div>
  )
}

export default Login
