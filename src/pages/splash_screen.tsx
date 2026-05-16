import { useValidation } from "../context/validate_user";
import { userFallBack } from "../modules/endpoint_fallback"

export default function SplashScreen() {


    const { setOnValidation } = useValidation();
    userFallBack(setOnValidation);
    
    return (
        <>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'GrayText' }}>Loading...</span>
            </div>
        </>
    )
}