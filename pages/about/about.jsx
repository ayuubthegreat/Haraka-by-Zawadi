import { BASE_DATA } from "../../BASE_URL";
import '../about/about.css'

export const AboutGeneral = () => {
    const revealOrHideSection = (id) => {
        const section = document.getElementById(id).getElementsByClassName("descriptions")[0];
        if (section) {
            section.style.display = section.style.display === "none" ? "block" : "none";
        }
    }
    return (
        <div>
            <div className="about-hero-section section">
                <div className="textbox">
<h1>About {BASE_DATA.NAME}</h1>
                <p>An ordering website where you can easily manage your restaraunts and orders efficiently.</p>
                </div>
                
            </div>
            <div id="about-us" className="section">
                <div className="header">
                    <button onClick={() => revealOrHideSection("about-us")}>Toggle</button>
                    <h2>About Us</h2>
                </div>
                <div className="descriptions">
                     <div className="descriptionBox">
                    <h2>Our Mission</h2>
                    <p>Our mission is to provide a seamless ordering experience for both restaurants and customers, making ordering and restaraunt management efficient and hassle-free.</p>
                </div>
                 <div className="descriptionBox">
                    <h2>Catering To Restaraunts</h2>
                    <p>Using our ordering and restaraunt management software is easy and intuitive, allowing restaurants to efficiently manage their orders without any hassle.</p>
                </div>
                 <div className="descriptionBox">
                    <h2>Streamlining Restaraunt Ordering for Customers</h2>
                    <p>On the Orders page, you can see any orders for included restaraunts, so you can easily plan and track orders for your favorite restaraunts.</p>
                </div>
                <div className="descriptionBox">
                    <h2>Haraka Caters to Both Groups</h2>
                    <p>Haraka is designed to serve both restaurants and customers, ensuring that restaurants can manage orders efficiently while customers enjoy a seamless ordering experience.</p>
                </div>
                </div>
               
            </div>
            <div id="developers" className="section">
                <div className="header">
                    <button onClick={() => revealOrHideSection("developers")}>Hide</button>
                    <h2>Developers of This Website</h2>
                </div>
                <div className="descriptions">
                <div className="descriptionBox style2">
                   <p>This website is primarily developed by <strong>Crescent Moon Studio</strong>, a company dedicated to creating products rich in variety and functionality. (In other words, really cool stuff that can do many different things.) For more details about Crescent Moon Studio, please visit their website. <a href="https://crescentmoonstudio.com" target="_blank" rel="noopener noreferrer">Crescent Moon Studio</a></p>
                </div>
                </div>
            </div>
            <div id="pricing" className="section">
                <div className="header">
                    <button onClick={() => revealOrHideSection("pricing")}>Hide</button>
                    <h2>Planned Price of Services</h2>
                </div>
                <div className="descriptions">
                <div className="descriptionBox">
                    <p>The planned pricing for our services will be made available soon. Stay tuned for updates regarding the cost of using our ordering and restaurant management platform.</p>
                </div>
                </div>
            </div>
        </div>
    );
}
