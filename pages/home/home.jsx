import { Link } from "react-router-dom";
import "./home.css";
import { BASE_DATA } from "../../BASE_URL";


export default function Home() {
    return (
        <div>
            <div className="header section">
                <div className="textbox-section style-1">
                    <h1>Haraka-by Zawadi</h1>
                <p>A one stop shop for planning your next order at Zawadi's restaraunts</p>
                <div className="button-section">
                    <Link to="/orders">View Orders</Link>
                </div>
                </div>
            </div>
            <div className="features section">
                <div className="textbox-section style-2">
                    <h1>Streamline your ordering process</h1>
                    <p>{BASE_DATA.NAME} allows you to easily place and manage orders for ease of use for both you and your customers--but mostly you.</p>
                    <div className="features-parent-box">
                       <h2>For Users</h2>
                    <div className="features-box">
                        <div className="feature-card">
                            <h3>Real-Time Updates</h3>
                            <p>Get real-time updates on your orders, so you can stay informed about the status of your deliveries.</p>
                        </div>
                        <div className="feature-card">
                            <h3>See Orders at a Glance</h3>
                            <p>Our dashboard provides a clear overview of all your orders, making it easy to track and manage them efficiently.</p>
                        </div>
                    </div> 
                    </div>
                    <div className="features-parent-box">
                       <h2>For Restaurants</h2>
                    <div className="features-box">
                        <div className="feature-card">
                            <h3>Create Orders Easily</h3>
                            <p>Our user-friendly interface makes it easy for you to place and manage orders with just a few clicks.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Quick Customer Support</h3>
                            <p>Get real-time updates on your orders, so you can stay informed about the status of your deliveries.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Manage Restaurant Easily</h3>
                            <p>Our dashboard provides a clear overview of all your orders, making it easy to track and manage them efficiently.</p>
                        </div>
                    </div> 
                    </div>
                    <p>{BASE_DATA.NAME} is easy to use for both restaurant owners and restaurant customers.</p>
                </div>
            </div>
            <div className="restaraunt-owner-section section">
                <div className="textbox-section style-3">
                    <h1>Are you a restaurant owner?</h1>
                    <p>Contact us to learn how {BASE_DATA.NAME} can help you streamline your ordering process and improve customer satisfaction.</p>
                    <div className="button-section">
                        <a href={`mailto:${BASE_DATA.CONTACT_EMAIL}`}>Contact Us</a>
                    </div>
                </div>
            </div>
            <div className="footer section">
                <p>&copy; {new Date().getFullYear()} {BASE_DATA.NAME}. All rights reserved.</p>
            </div>
        </div>
    )
}