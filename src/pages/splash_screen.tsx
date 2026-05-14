import { useNavigate } from 'react-router-dom';
import { useValidation } from '../context/validate_user'
import { useEffect } from 'react'


export default function SplashScreen() {

    const navigate = useNavigate();

    // FIX: Call the hook exactly once at the top level
    const { setOnValidation } = useValidation();

    useEffect(() => {
        const id = setTimeout(() => {
            setOnValidation(false); // This now correctly targets the state above
            navigate('/login', { replace: true });
        }, 1000);

        return () => clearTimeout(id);
    }, [navigate, setOnValidation]); // Added missing dependency array items

    return (
        <>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'GrayText' }}>Loading...</span>
            </div>
        </>
    )
}