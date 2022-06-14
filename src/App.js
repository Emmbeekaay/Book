import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Projects from "./Projects";
import Signup from "./Signup";

function App() {
  const home = "Homepage";


 
  return (
    <Router>
      <div className="App">
        <Navbar home={home} />
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route  path='/projects' exact>
            <Projects />
          </Route>
          <Route  path='/signup' exact>
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
