import "./App.css";
import AppLayout from "./components/layout/layout";
import { Switch } from "antd";
import { Route } from "react-router-dom";
import DuAnLayout from "./components/layout/nhomcongviec";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
        exact
        path="/"
        component={() => (
          <AppLayout>
            <DuAnLayout/>
          </AppLayout>
        )}
        />

        
      </Switch> 
    </div>
  );
}

export default App;
