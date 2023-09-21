import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainScreen} />
      </Switch>
    </Router>
  );
}

export default App;
