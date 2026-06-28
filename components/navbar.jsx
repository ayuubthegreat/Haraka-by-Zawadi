import { Link, useNavigate } from "react-router-dom"
import { BASE_DATA } from "../BASE_URL"
import "./navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const nav = useNavigate();
    const patch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const isAdmin = user && (user.role === "ADMIN" || user.role === "SUPA_ADMIN");
    const isSupaAdmin = user && user.role === "SUPA_ADMIN";
    const [isRevealed, setIsRevealed] = useState(false);
    const onClickMobileLinksRevealer = () => {
        console.log(isRevealed)
        setIsRevealed(!isRevealed)
    }
    const onClickMobileLinksDisabler = () => {
        setIsRevealed(false)
    }
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
                <Link className="expanded-link" to="/about">About</Link>
                {user && <Link className="expanded-link" to="/orders">Orders</Link>}
                {!user && <Link className="expanded-link" to="/register">Register</Link>}
                {!user && <Link className="expanded-link login-btn" to="/login">Login</Link>}
                {isAdmin && <Link className="expanded-link" to="/create-order">Create Order</Link>}
                {isAdmin && <Link className="expanded-link" to="/restaraunts">Your Restaraunts</Link>}
                {isSupaAdmin && <Link className="expanded-link" to="/create-restaraunt">Create Restaraunt</Link>}
                {user && <button onClick={() => {
                    patch(logout());
                    nav("/login");
                }}>Logout</button>}
                <div className="mobile-links-revealer-parent">
                    <button className="revealer-button" onClick={onClickMobileLinksRevealer}>-</button>
                    <div className="background" onClick={onClickMobileLinksDisabler} style={{display: (isRevealed ? "flex" : "none")}}>
                        </div>
                        <div className="mobile-links-revealer" style={{display: (isRevealed ? "flex" : "none")}} >
                        <div className="mobile-nav-links">
                            <Link to="/about">About</Link>
                {user && <Link className="mobile-link" to="/orders">Orders</Link>}
                {!user && <Link className="mobile-link"  to="/register">Register</Link>}
                {!user && <Link className="mobile-link login-btn" to="/login">Login</Link>}
                {isAdmin && <Link className="mobile-link"  to="/create-order">Create Order</Link>}
                  {isAdmin && <Link className="mobile-link" to="/restaraunts">Your Restaraunts</Link>}
                {isSupaAdmin && <Link className="mobile-link" to="/create-restaraunt">Create Restaraunt</Link>}
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            
        </nav>
    )
}