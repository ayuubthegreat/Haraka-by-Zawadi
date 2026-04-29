import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { Navbar } from '../components/navbar'
import Home from '../pages/home'
import Orders from '../pages/orders'

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
        </Routes>
        </Router>
    </>
  )
}

export default App
