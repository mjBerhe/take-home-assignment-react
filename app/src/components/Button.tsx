import React from "react"
import classNames from "classnames"

interface ButtonProps {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = props => {
  const { onClick, children, className } = props

  return (
    <button
      onClick={onClick}
      className={classNames(
        "bg-[#9A48D6] h-[40px] text-[14px] leading-[24px] text-white font-bold rounded-sm",
        className
      )}
    >
      {children}
    </button>
  )
}
