import { Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/default_page";
import MainPage from "./pages/main_page";
import { userFallBack } from "./modules/endpoint_fallback";
import { useValidation } from "./context/validate_user";
import SplashScreen from "./pages/splash_screen";

export default function App() {

  const { setOnValidation, onValidation } = useValidation();
 
  userFallBack(setOnValidation);

  if (onValidation) {

    console.log('Validating...', onValidation)
    return <div className="app">
      <SplashScreen />
    </div>

  }
  else {
    console.log('validating...', onValidation)
  }

  
  return (
    <>
      <div className='app'>
       
        <Routes>
          <Route path="/*" element={<DefaultPage />} />
          <Route path="/app/*" element={<MainPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

