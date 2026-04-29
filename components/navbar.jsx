import { Link, useNavigate } from "react-router-dom"
import { BASE_DATA } from "../BASE_URL"
import "./navbar.css"

export const Navbar = () => {
    const nav = useNavigate();
    return (
        <nav>
            <div className="title" onClick={() => {
                nav("/");
            }}>
                <h1>{BASE_DATA.NAME}</h1>
            </div>
            <div className="nav-links">
                <Link to="/orders">Orders</Link>
                <Link to="/login">Login (for staff only)</Link>
                <Link to="/create-order">Create Order</Link>
                <Link to="/create-restaraunt">Create Restaraunt</Link>
            </div>
        </nav>
    )
}