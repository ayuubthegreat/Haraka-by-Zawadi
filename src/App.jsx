import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { Navbar } from '../components/navbar'
import Home from '../pages/home'
import Orders from '../pages/orders'
import CreateOrderPage from '../pages/createOrder'
import { CreateRestarauntPage } from '../pages/createRestaraunt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
          <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/create-restaraunt" element={<CreateRestarauntPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </Router>
    </>
  )
}

export default App
