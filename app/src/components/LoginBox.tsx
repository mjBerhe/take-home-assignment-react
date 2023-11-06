import React, { useState, useEffect } from "react"
import { Button } from "./Button"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const AUTHENTICATE = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      accessToken
      expiresAt
      refreshToken
    }
  }
`

export const LoginBox: React.FC = () => {
  const [login, { data, loading, error }] = useMutation(AUTHENTICATE)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

  const handleSignIn = async () => {
    await login({ variables: { email: email, password: password } })
  }

  const handleForgetPassword = () => {
    console.log("this should do something")
  }

  useEffect(() => {
    if (data?.authenticate?.accessToken) {
      localStorage.setItem("token", data.authenticate.accessToken)
      navigate("/products")
    }
  }, [data])

  return (
    <div className="flex flex-col w-[466px] mx-auto">
      <div className=" w-full border bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.2)] rounded-[10px] p-[56px] flex flex-col">
        <img src="/Logo@3x.png" className="w-[143px]" />
        <div className="mt-[40px]">
          <span className="text-[30px] leading-[40px] text-black font-semibold">Sign in</span>
        </div>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col mt-[32px] gap-y-4">
            <label htmlFor="email" className="font-bold text-[14px] leading-[24px] text-black">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              className="max-h-[40px] bg-white rounded-sm border border-[#CCCCCC] pl-4 py-2 text-black text-[14px] leading-[24px]"
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <label htmlFor="password" className="font-bold text-[14px] leading-[24px] text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              className="max-h-[40px] bg-white rounded-sm border border-[#CCCCCC] pl-4 py-2 text-black text-[14px] leading-[24px]"
            />
          </div>

          <Button onClick={handleSignIn} className="w-full">
            Sign in
          </Button>

          <button
            onClick={handleForgetPassword}
            className="text-[14px] leading-[24px] text-black font-bold text-center"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <div className="flex mt-8">
        <span className="text-[14px] leading-[24px] text-[#858484] text-center">
          &copy;2001-2019 All Rights Reserved. Clip&#174; is a registered trademark of Rover Labs.{" "}
          <a href="/login/">Cookie Preferences</a>, <a href="/login/">Privacy</a>, and <a href="/login/">Terms</a>.
        </span>
      </div>
    </div>
  )
}
