import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Duan from "./components/layout/du-an";
import CongViec from "./components/layout/cong-viec";
import { Route, Switch } from "react-router-dom";
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
