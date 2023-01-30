import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Reworks from "./scenes/reworks";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/login/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const {currentUser} = useContext(AuthContext);
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login"/>
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          
          {!currentUser ? null : <Sidebar isSidebar={isSidebar}/>}
          <main className="content">
            {!currentUser ? null : <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/">
                  <Route path="login" element={<Login/>} />
                  <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
              </Route>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/team" element={<RequireAuth><Team /></RequireAuth>} />
              <Route path="/reworks" element={<RequireAuth><Reworks /></RequireAuth>}>
                  <Route path=":id" element={<RequireAuth><Reworks /></RequireAuth>} />
              </Route>
              <Route path="/form" element={<RequireAuth><Form /></RequireAuth>} />
              <Route path="/bar" element={<RequireAuth><Bar /></RequireAuth>} />
              <Route path="/pie" element={<RequireAuth><Pie /></RequireAuth>} />
              <Route path="/line" element={<RequireAuth><Line /></RequireAuth>} />
              <Route path="/faq" element={<RequireAuth><FAQ /></RequireAuth>} />
              <Route path="/calendar" element={<RequireAuth><Calendar /></RequireAuth>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
