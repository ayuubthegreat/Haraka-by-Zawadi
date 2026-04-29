import { Link } from "react-router-dom";
import "./home.css";


export default function Home() {
    return (
        <div>
            <div className="header section">
                <div className="textbox-section">
                    <h1>Haraka--by Zawadi</h1>
                <p>A one stop shop for planning your next order at Zawadi's restaraunts</p>
                <div className="button-section">
                    <Link to="/orders">View Orders</Link>
                </div>
                </div>
            </div>
        </div>
    )
}