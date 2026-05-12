import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import MobileFooter from './components/mobileFooter';
import Header from './components/header';
import Search from './pages/search';



export default function App() {

  return (
    <div className='app' >
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <MobileFooter />
    </div>
  )
}

