import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Dashboard} from "./dashboard";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {PickACat} from "./PickACat";
import {AddCatForm} from "./addCatForm";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
    return (
        <div className="App">
            <Router>
                <h1>Welcome to FACEMASHCAT</h1>
                <div className="menu">
                    <div className="menu-item">
                        <Link to="/">
                            <i className="fas fa-home"/>
                            Home
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
                {/*<Link to="/add">*/}
                {/*    <i className="fas fa-plus-circle"/>*/}
                {/*    Ajouter un chat*/}
                {/*</Link>*/}
                <Switch>
                    <Route exact path="/" component={PickACat}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    {/*<Route exact path="/add" component={AddCatForm}/>*/}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
