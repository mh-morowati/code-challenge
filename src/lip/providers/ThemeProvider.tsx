"use client"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { createContext, useContext, useEffect, useState } from "react"

// Define the context type explicitly for better type safety
interface ThemeContextProps {
  toggleTheme: () => void
  mode: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => {},
  mode: "light",
})

export const ThemeProvider = (
    { children }: { children: React.ReactNode }
) => {

  const [mode, setMode] = useState<"light" | "dark">("light")

  // Set theme mode from localStorage if available
    useEffect(() => {
      
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (savedTheme) setMode(savedTheme)
        
  }, [])

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("theme", newMode)
  }

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
