import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Duan from "./components/layout/du-an";
import CongViec from "./components/layout/cong-viec";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/layout/Login"
import Resetpassword from "./components/layout/Resetpassword"
import Forgotpassword from "./components/layout/Forgotpassword"
// import Login from './pages/Login';
// import Resetpassword from './pages/Resetpassword';
// import Forgotpassword from './pages/Forgotpassword';
// import MainLayout from './components/MainLayout';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/Dashboard"
          component={() => (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          )}
        />
        <Route path="/" exact component={Login} />
        <Route  path="/reset-password"  exact component={Resetpassword} />
        <Route  path="/forgot-password" exact component={Forgotpassword} />
        <Route
          exact
          path="/du-an"
          component={() => (
            <AppLayout>
              <Duan />
            </AppLayout>
          )}
        />
        <Route
          exact
          path="/du-an/:id"
          component={() => (
            <AppLayout>
              <CongViec />
            </AppLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
