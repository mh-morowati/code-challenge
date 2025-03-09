"use client"
import { useTheme } from "@/lib/providers/ThemeProvider"
import Brightness4 from "@mui/icons-material/Brightness4"
import Brightness7 from "@mui/icons-material/Brightness7"
import { IconButton } from "@mui/material"


export default function ThemeToggle() {

  const { toggleTheme, mode } = useTheme()

  return (
      <IconButton onClick={toggleTheme} color="primary">
          
          {
              mode === "dark" ?
              <Brightness7 fontSize="large" /> :
                  <Brightness4 fontSize="large" />
          }
          
    </IconButton>
  )
}
