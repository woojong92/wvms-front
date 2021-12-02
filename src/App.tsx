import React from 'react';

import ApplicationPage from 'pages/Application/ApplicationPage';
import CalendarPage from 'pages/Calendar/CalendarPage';
import HistoryPage from 'pages/History/HistoryPage';
import HistoryViewPage from 'pages/HistoryView/HistoryViewPage';
import HomePage from 'pages/Home/HomePage';
import LoginPage from 'pages/Login/LoginPage';
import ProfilePage from 'pages/Profile/ProfilePage';

import { BrowserRouter, Route, Switch, Redirect, useParams, useHistory } from 'react-router-dom';

import { ThemeProvider } from "styled-components";
import theme from 'theme/theme';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import RegisterPage from 'pages/Register/RegisterPage';
import { setProfile, setToken } from 'appSlice';
import axios from 'axios';
import { getProfile } from 'apis';


const { darkTheme, lightTheme } = theme;

function App() {

  const {isDark} = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  const history = useHistory();

  // useEffect(()=>{
  //   console.log(isDark);
  // }, [isDark])
  // const getProfile = async (token: string) => {
  //   try{
  //     const response = await axios({
  //       url: 'http://localhost:3011/api/auth/profile',
  //       method: 'get',
  //       headers: { Authorization: `Bearer ${token}` },
  //   })
  //   console.log('getProfile : ', response);
  //   return response;
  
  //   // return response;

  //   }catch(e) {
  //     console.log('getProfile Error :', e)
  //     return e.response;
  //   }
  // }

 
  const dispachProfile = async (token: string) => {
    const response = await getProfile(token);
    if(response.status === 200 ){
      dispatch(setProfile(response.data));
    }
  }

  useEffect(()=>{
    const access_token = localStorage.getItem('access_token');
    console.log('access_token', access_token)
    if(access_token) {
      dispatch(setToken(access_token));
      dispachProfile(access_token);
    }
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={ isDark ?  darkTheme: lightTheme}>
        <Switch>
         <Route path="/login" component={LoginPage}  />
         <Route path="/register" component={RegisterPage}  />
          <PrivateRoute exact path="/"  > 
            <HomePage />
          </PrivateRoute>
          <PrivateRoute path="/Calendar"  > 
            <CalendarPage />
          </PrivateRoute>
          <PrivateRoute path="/Application"  > 
            <ApplicationPage />
          </PrivateRoute>
          <PrivateRoute exact path="/History/:id"  > 
            <HistoryViewPage />
          </PrivateRoute>
          <PrivateRoute path="/History"  > 
            <HistoryPage />
          </PrivateRoute>
          <PrivateRoute path="/Profile"  > 
            <ProfilePage />
          </PrivateRoute> 
          <Route path="*">
            <Redirect
              to={{
                pathname: "/",
                // state: { from: location }
              }}
            />
          </Route>
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
