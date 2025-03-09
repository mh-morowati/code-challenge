import Button from "@mui/material/Button"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"


const Header = () => {

    return (
        <div className="h-20 border-b border-zinc-300 place-content-center">
            <ThemeToggle />
            <Link className="" href={"/"}>
                <Button color="inherit">
                Code Challenge
            </Button>
            </Link>
        <Link href={"/login"}>
         <Button className="float-right md:w-60" size="large" variant="contained" color="success">
            Login
            </Button>
        </Link>
        </div>
    )
}

export default Header