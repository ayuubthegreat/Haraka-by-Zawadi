import { Link } from "react-router-dom"
import { BASE_DATA } from "../BASE_URL"
import "./navbar.css"

export const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>{BASE_DATA.NAME}</h1>
            </div>
            <div className="nav-links">
                <Link to="/orders">Orders</Link>
                <Link to="/login">Login (for staff only)</Link>
            </div>
        </nav>
    )
}