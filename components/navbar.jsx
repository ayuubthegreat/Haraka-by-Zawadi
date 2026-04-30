import { Link, useNavigate } from "react-router-dom"
import { BASE_DATA } from "../BASE_URL"
import "./navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";

export const Navbar = () => {
    const nav = useNavigate();
    const patch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const isAdmin = user && (user.role === "ADMIN" || user.role === "SUPA_ADMIN");
    const isSupaAdmin = user && user.role === "SUPA_ADMIN";
    return (
        <nav>
            <div className="title" onClick={() => {
                nav("/");
            }}>
                <h1>{BASE_DATA.NAME}</h1>
            </div>
            <div className="nav-links">
                {user && <div className="userWelcome">
                    <span className="welcomeText">Welcome, {user.name}!</span>
                    <p style={{backgroundColor: isSupaAdmin ? "red" : isAdmin ? "orange" : "yellow"}} className="userRole">{user.role}</p>
                    </div>}
                {user && <Link to="/orders">Orders</Link>}
                {!user && <Link to="/login">Login</Link>}
                {!user && <Link to="/register">Register</Link>}
                {isAdmin && <Link to="/create-order">Create Order</Link>}
                {isSupaAdmin && <Link to="/create-restaraunt">Create Restaraunt</Link>}
                {user && <button onClick={() => {
                    patch(logout());
                    nav("/login");
                }}>Logout</button>}
            </div>
        </nav>
    )
}