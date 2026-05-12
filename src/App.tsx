import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import MobileFooter from './components/mobileFooter';
import Header from './components/header';



export default function App() {

  return (
    <div className='app' >
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <MobileFooter />
    </div>
  )
}

