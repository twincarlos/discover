import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import * as sessionActions from "./store/session";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            { sessionUser ? <Home /> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/login">
            { sessionUser ? <Redirect to="/" /> : <LoginFormPage /> }
          </Route>
          <Route exact path="/signup">
            { sessionUser ? <Redirect to="/" /> : <SignupFormPage /> }
          </Route>
          <Route exact path="/user/:userId">
            { sessionUser ? <Profile /> : <Redirect to="/login" /> }
          </Route>
          <Route>
            <h1>404 PAGE NOT FOUND</h1>
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
