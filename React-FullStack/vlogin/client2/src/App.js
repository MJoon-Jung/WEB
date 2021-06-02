import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from "./component/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
