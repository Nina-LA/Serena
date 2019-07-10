import React, { Component } from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Switch, NavLink, Route } from "react-router-dom";

import axios from "axios";
import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Home from "./components/Home";
import ComprendreLaDepression from "./components/ComprendreLaDepression";
import MieuxEtre from "./components/MieuxEtre";
import VideosInspirantes from "./components/VideosInspirantes";
import RetrouverSaConfianceEnSoi from "./components/RetrouverSaConfianceEnSoi";
import RoutineMatinale from "./components/RoutineMatinale";
import Meditation from "./components/Meditation";
import MaitriserSonSommeil from "./components/MaitriserSonSommeil";
import Activities from "./components/Activities";
import ListActivities from "./components/ListActivities";
import logo from "./images/logo_transparent.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromBackend => {
        // console.log("Check User in APP.JS: ",responseFromBackend.data)
        const { userDoc } = responseFromBackend.data;
        this.syncCurrentUser(userDoc);
        console.log(userDoc);
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user) {
    this.setState({ currentUser: user });
  }

  render() {
    let app, nav;

    if (this.state.currentUser == null) {
      nav = (
        <nav className="header-right">
          <NavLink exact to="/">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/ComprendreLaDepression">
            Comprendre La Dépression
          </NavLink>
          <NavLink to="/MieuxEtre"> Le Mieux Etre </NavLink>
          <NavLink to="/signup-page"> Signup </NavLink>
          <NavLink to="/login-page"> Login </NavLink>
        </nav>
      );
      app = (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/ComprendreLaDepression"
              component={ComprendreLaDepression}
            />
            <Route
              exact
              path="/VideosInspirantes"
              component={VideosInspirantes}
            />
            <Route
              exact
              path="/RetrouverSaConfianceEnSoi"
              component={RetrouverSaConfianceEnSoi}
            />
            <Route exact path="/RoutineMatinale" component={RoutineMatinale} />
            <Route exact path="/Meditation" component={Meditation} />
            <Route exact path="/MieuxEtre" component={MieuxEtre} />
            <Route
              exact
              path="/MaitriserSonSommeil"
              component={MaitriserSonSommeil}
            />

            <Route
              path="/signup-page"
              render={() => (
                <Signup
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/login-page"
              render={() => (
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/logout-page"
              render={() => (
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      nav = (
        <nav className="header-right">
          <NavLink exact to="/">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/ComprendreLaDepression">
            Comprendre La Dépression
          </NavLink>
          <NavLink to="/MieuxEtre"> Le Mieux Etre </NavLink>
          <NavLink to="/Activities"> Ajouter des Activités </NavLink>
          <NavLink to="/ListActivities"> Liste des Activités </NavLink>
          <NavLink to="/login-page"> Logout </NavLink>
        </nav>
      );
      app = (
        <div>
          <Switch>
            {/* this is example how to normally do the Route: */}
            {/* <Route path="/somePage" component={ someComponentThatWillRenderWhenUSerClickThisLink }   /> */}
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/ComprendreLaDepression"
              component={ComprendreLaDepression}
            />
            <Route
              exact
              path="/VideosInspirantes"
              component={VideosInspirantes}
            />
            <Route
              exact
              path="/RetrouverSaConfianceEnSoi"
              component={RetrouverSaConfianceEnSoi}
            />
            <Route exact path="/RoutineMatinale" component={RoutineMatinale} />
            <Route exact path="/Meditation" component={Meditation} />
            <Route exact path="/MieuxEtre" component={MieuxEtre} />
            <Route
              exact
              path="/MaitriserSonSommeil"
              component={MaitriserSonSommeil}
            />
            <Route exact path="/Activities" component={Activities} />
            <Route
              exact
              path="/ListActivities"
              render={props => (
                <ListActivities user={this.state.currentUser} {...props} />
              )}
            />
            {/* <Route exact path="/ListActivities" component={ListActivities} /> */}

            <Route
              path="/logout-page"
              render={() => (
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="header">
          <img className="logo" alt="Serena" src={logo} />
          {nav}
        </header>
        {app}
        <footer> Made with ❤️ at Ironhack - PTWD 2019 </footer>
      </div>
    );
  }
}

export default App;
