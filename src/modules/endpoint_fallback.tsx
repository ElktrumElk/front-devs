import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userAuthentication } from '../data/authenticate';
import { routes } from '../modules/routes';

export function userFallBack(validating: React.Dispatch<React.SetStateAction<boolean>>) {

    const navigate = useNavigate();

    const handleRoute = (path: any) => {
        return setTimeout(() => {
            validating(false)
            navigate(path, { replace: true });
        }, 1000)
    }

    useEffect(() => {
        console.log('running...');
        const a = async () => {
            const { loginResponse, emailResponse } = await userAuthentication();
            const handleValidation = () => {
                if (loginResponse.status === 'fulfilled' && emailResponse.status === 'fulfilled') {
                    if (loginResponse.value === null) { return routes.login }
                    if (emailResponse.value === null) { return routes.verifyEmail }

                    if (loginResponse.value) {
                        if (emailResponse.value) { return routes.home }
                    }
                    return routes.splash
                }
            }

            handleRoute(handleValidation())

        };

        a();

    }, [])


}