/*import logo from './logo.svg';
import './App.css';*/

import { Route, Link, BrowserRouter } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Settings from "./components/Settings";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Categories from "./components/Categories";
import Restaurants from "./components/Restaurants";
import Specialities from "./components/Specialities";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Signin} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Categories" component={Categories} />
        <Route path="/Products" component={Products} />
        <Route path="/Restaurants" component={Restaurants} />
        <Route path="/Specialities" component={Specialities} />
        <Route path="/Settings" component={Settings} />
      </div>
    </BrowserRouter>
  );
}

export default App;
