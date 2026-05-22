import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { Navbar } from '../components/navbar'
import Home from '../pages/home'
import Orders from '../pages/orders'
import CreateOrderPage from '../pages/createOrder'
import { CreateRestarauntPage } from '../pages/createRestaraunt'
import { LoginPage, RegisterPage } from '../pages/login_register'
import { useDispatch, useSelector } from 'react-redux'
import { GetCurrentUser } from '../components/store/authSlice'

function App() {
  const [count, setCount] = useState(0)
  const {user, token} = useSelector((state) => state.auth);
  const patch = useDispatch();
  useEffect(() => {
    console.log("App mounted");
    if (localStorage.getItem("token") && !user) {
      // Fetch user data here
      patch(GetCurrentUser());
    }
  }, [token, user, patch]);
  return (
    <>
        <Router>
          <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/create-restaraunt" element={<CreateRestarauntPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </Router>
    </>
  )
}

export default App
