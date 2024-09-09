import { useEffect, useState } from "react"
import ThemeIcon from "./ThemeIcon"

function ThemeToggle() {
    const [theme, toggleTheme] = useState(localStorage.getItem("theme") || "light")
    
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme",theme),[theme]
    })

    const handleToggle = () => {
        toggleTheme((oldTheme) => {
            return oldTheme==="light"?"dark":"light"
        })
    }

  return (
      <button onClick={handleToggle} className="aspect-square h-10 flex justify-center items-center bg-transparent border-0">
          <span className="sr-only">Theme</span>
          <ThemeIcon theme={theme}/>
    </button>
  )
}

export default ThemeToggle