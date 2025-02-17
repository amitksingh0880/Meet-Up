import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Chat from "scenes/Message/Chat";



function App() {

  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <Routes>
            
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/home/chat" element={isAuth ? <Chat/> : <Navigate to="/" />} />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
