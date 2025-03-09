"use client"
import { useTheme } from "@/lip/providers/ThemeProvider"
import { IconButton } from "@mui/material"
import { Brightness7, Brightness4 } from '@mui/icons-material'


export default function ThemeToggle() {
    
  const { toggleTheme, mode } = useTheme()

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}
