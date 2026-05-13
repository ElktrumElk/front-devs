import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import MobileFooter from './components/mobileFooter';
import Header from './components/header';
import Search from './pages/search';
import AddPost from './pages/post';



export default function App() {

  return (
    <div className='app' >
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/post' element={<AddPost />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <MobileFooter />
    </div>
  )
}

