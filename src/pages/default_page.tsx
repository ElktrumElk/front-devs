import { Routes, Route } from 'react-router-dom'
import SplashScreen from './splash_screen'
import Login from './login_page'
import Signup from './signup_page';
import VerifyEmail from './verify_email';

export default function DefaultPage() {

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Routes>
                <Route path='/splash' element={<SplashScreen />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/verifyemail' element={<VerifyEmail />} />
            </Routes>
        </div>
    );
}