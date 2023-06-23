import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Duan from "./components/layout/du-an";
import CongViec from "./components/layout/cong-viec";
import ChiTietCongViec from "./components/layout/chi-tiet-cong-viec";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/layout/Login";
import Resetpassword from "./components/layout/Resetpassword";
import Forgotpassword from "./components/layout/Forgotpassword";
import User from "./components/layout/ThanhVien";
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
        <Route path="/reset-password" exact component={Resetpassword} />
        <Route path="/forgot-password" exact component={Forgotpassword} />
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
        <Route
          exact
          path="/cong-viec/:id"
          component={() => (
            <AppLayout>
              <ChiTietCongViec />
            </AppLayout>
          )}
        />
        <Route
          exact
          path="/User"
          component={() => (
            <AppLayout>
              <User />
            </AppLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
