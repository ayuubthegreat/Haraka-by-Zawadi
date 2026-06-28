import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { Navbar } from '../components/navbar'
import Home from '../pages/home/home'
import Orders from '../pages/orders/orders'
import CreateOrderPage from '../pages/createOrder/createOrder'
import { CreateRestarauntPage } from '../pages/createRestaraunt/createRestaraunt'
import { LoginPage, RegisterPage } from '../pages/login_register'
import { LoadOrders, LoadRestaraunts } from '../components/store/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { GetCurrentUser, GetAllUsers } from '../components/store/authSlice'
import { RestarauntsPage } from '../pages/restaraunt/restaraunts'
import { AboutGeneral } from '../pages/about/about'

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
    patch(GetAllUsers()); 
    patch(LoadOrders());
    patch(LoadRestaraunts());
  }, [token, user, patch]);
  return (
    <>
        <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutGeneral />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/restaraunts" element={<RestarauntsPage />} />
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
