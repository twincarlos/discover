import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
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

  if (sessionUser) {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/user/:userId">
              <Profile />
            </Route>
            <Route>
              <h1>404 Page Not Found</h1>
            </Route>
          </Switch>
        )}
      </>
    );
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/login">
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path ="/">
              <LoginFormPage />
            </Route>
            <Route>
              <h1>404 Page Not Found</h1>
            </Route>
          </Switch>
        )}
      </>
    );
  };

}

export default App;
