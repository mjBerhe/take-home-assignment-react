import React from "react"

const App: React.FC = () => {
  return (
    <div className="bg-[#f4f4f4] min-h-screen w-full mx-auto">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center bg-[#9A48D6] h-[40px] text-[14px] leading-[24px] text-white font-bold rounded-sm w-[200px]">
          <a href="/login" className="text-center w-full">
            Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
