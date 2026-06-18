import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { Cart } from '@/pages/Cart'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register' 
import { ProductDetail } from '@/pages/ProductDetail'
import { Toaster } from '@/components/ui/sonner'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories/:category" element={<Home />} />    
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} />   
        </Routes>
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
