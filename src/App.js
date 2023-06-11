import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Duan from "./components/layout/du-an";
import CongViec from "./components/layout/cong-viec";
import { Route, Switch } from "react-router-dom";
import Appdate from "./components/layout/date";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={() => <AppLayout></AppLayout>} />
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
          path="/cong-viec"
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
