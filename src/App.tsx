import CalendarPage from 'pages/CalendarPage';
import HistoryPage from 'pages/HistoryPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}  />
        <Route path="/login" component={LoginPage}  />
        <Route path="/Calendar" component={CalendarPage}  />
        <Route path="/History" component={HistoryPage}  />
        <Route path="/Profile" component={ProfilePage}  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
