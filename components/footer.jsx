import '../components/footer.css'
import { BASE_DATA } from '../BASE_URL'
export const Footer = () => {
    return (
        <div className="footer section">
            <p>&copy; {new Date().getFullYear()} {BASE_DATA.NAME}. All rights reserved.</p>
        </div>
    )
} 