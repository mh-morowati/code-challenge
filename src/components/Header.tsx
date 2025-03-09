import Button from "@mui/material/Button"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"

const Header = () => {
    return (<div className="h-20 border-b border-zinc-300">
        <ThemeToggle />
        <Link href={"/login"}>
         <Button>
            Login
            </Button>
        </Link>
    </div>)
}

export default Header