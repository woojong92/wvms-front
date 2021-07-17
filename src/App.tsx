import React from 'react';

import ApplicationPage from 'pages/Application/ApplicationPage';
import CalendarPage from 'pages/Calendar/CalendarPage';
import HistoryPage from 'pages/History/HistoryPage';
import HomePage from 'pages/Home/HomePage';
import LoginPage from 'pages/Login/LoginPage';
import ProfilePage from 'pages/Profile/ProfilePage';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { ThemeProvider } from "styled-components";
import theme from 'theme/theme';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';

const { darkTheme, lightTheme } = theme;

function App() {

  const {isDark} = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()



  // useEffect(()=>{
  //   console.log(isDark);
  // }, [isDark])

  return (
    <BrowserRouter>
      <ThemeProvider theme={ isDark ?  darkTheme: lightTheme}>
        <Switch>
         <Route path="/login" component={LoginPage}  />
          {/* <Route path="/" exact component={HomePage}  />
          <Route path="/login" component={LoginPage}  />
          <Route path="/Calendar" component={CalendarPage}  />
          <Route path="/Application" component={ApplicationPage}  /> */}
          {/* <Route path="/History" component={HistoryPage}  /> */}
          {/* <Route path="/Profile" component={ProfilePage}  /> */}
          {/* <Route path="/" render={()=> <Redirect to={{ pathname: "/home"}}/> } /> */}
          <PrivateRoute exact path="/"  > 
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/Calendar"  > 
            <CalendarPage />
          </PrivateRoute>
          <PrivateRoute path="/Application"  > 
            <ApplicationPage />
          </PrivateRoute>
          <PrivateRoute path="/History"  > 
            <HistoryPage />
          </PrivateRoute>
          <PrivateRoute path="/Profile"  > 
            <ProfilePage />
          </PrivateRoute> 
        </Switch>
        </ThemeProvider>
    </BrowserRouter>
  );
}

function PrivateRoute({children, ...rest}:any) {
  const {profile} = useAppSelector((state) => state.app)

  return (
    <Route
     {...rest}
      render={({ location }) =>
      profile ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
