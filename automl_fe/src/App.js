import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/Login';
import Product3 from './components/learn/Product3';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/shared/layout/header/Header';
import Model from './components/models/Model';

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/demo" component={Product3} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/model" component={Model} />
    </Switch>
    </>
  );
}

export default App;
