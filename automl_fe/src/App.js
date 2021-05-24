import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/Login';
import Product3 from './components/learn/Product3';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/demo" component={Product3} />
    </Switch>
  );
}

export default App;
