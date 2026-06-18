import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import { Footer } from '@/components/Footer.jsx'
import { Header } from '@/components/Header.jsx'
import { Home } from '@/pages/Home.jsx'
import { Cart } from '@/pages/Cart.jsx'
import { ProductDetail } from '@/pages/ProductDetail'
import { Login } from '@/pages/Login'
import { Toaster } from '@/components/ui/sonner'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/product/:id" element={<ProductDetail />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
