import { Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/default_page";
import MainPage from "./pages/main_page";

export default function App() {

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/*" element={<DefaultPage />} />
          <Route path="/app/*" element={<MainPage />}></Route>
        </Routes>
      </div>
    </>
  );
}
