import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header.jsx'
import { Home } from '@/pages/Home.jsx'
import { Cart } from '@/pages/Cart.jsx'
import { ProductDetail } from '@/pages/ProductDetail'
import { Toaster } from '@/components/ui/sonner'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories/:category" element={<Home />}/>       
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
