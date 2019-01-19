import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/books" component={Books} />
          <Route path="/search" component={Search} />
          <Route path="/detail/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
