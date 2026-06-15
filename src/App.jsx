import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header.jsx'
import { Home } from '@/pages/Home.jsx'
import { Cart } from '@/pages/Cart.jsx'
import { Toaster } from '@/components/ui/sonner'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />        
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
