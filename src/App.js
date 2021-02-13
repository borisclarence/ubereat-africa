/*import logo from './logo.svg';
import './App.css';*/

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Settings from "./components/Settings";
import Categories from "./components/Categories";
import Restaurants from "./components/Restaurants";
import Specialities from "./components/Specialities";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

import { AuthProvider } from "./context/AuthContext"

import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
      <Router>
          <AuthProvider>
              <Switch>
                  <Route exact path="/" component={Signin} />
                  <Route path="/Signup" component={Signup} />
                  <PrivateRoute path="/Dashboard" component={Dashboard} />
                  <PrivateRoute path="/Categories" component={Categories} />
                  <PrivateRoute path="/Products" component={Products} />
                  <PrivateRoute path="/Restaurants" component={Restaurants} />
                  <PrivateRoute path="/Specialities" component={Specialities} />
                  <PrivateRoute path="/Settings" component={Settings} />
              </Switch>
          </AuthProvider>
        </Router>
      </div>
    </BrowserRouter>
  );
}

export default App;
