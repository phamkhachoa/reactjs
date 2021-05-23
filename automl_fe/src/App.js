import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
