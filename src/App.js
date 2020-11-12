import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import ModalAlert from './components/ModalAlert';
import { ModalAlertProvider } from './contexts/ModalAlertContext';
import { LoadingProvider } from './contexts/LoadingContext';
import BookCreation from './components/BookCreation';
import LoadingOverlay from './components/LoadingOverlay';

const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 5% 20% 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f5f5;
    -webkit-font-smoothing: antialiased !important;
    @media(max-width: 800px) {
      padding: 5%;
    }
    @media(max-width: 1600px) {
      padding: 5% 10%;
    }
  }
  button {
    border: 0;
    background-color: #3f51b5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: 0;
    }
  }
  input[type=text], input[type=email], input[type=password] {
  border: solid 1px #ccc;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  }

// `;
function App() {
  return (
    <>
      <GlobalStyle />
      <ModalAlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <Router>
              <Redirect exact from="/" to="/login" />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/book/:id" component={BookDetails} />
              <PrivateRoute
                exact
                path="/createBook/:id"
                component={BookCreation}
              />
            </Router>
          </AuthProvider>
          <LoadingOverlay />
        </LoadingProvider>
        <ModalAlert />
      </ModalAlertProvider>
    </>
  );
}

export default App;
