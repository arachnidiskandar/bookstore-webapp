/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '../utils/test-utils';
import Login from '../components/Login';
import { LoadingContext } from '../contexts/LoadingContext';
import { AuthContext } from '../contexts/AuthContext';

describe('Login', () => {
  // const customRender = (ui, { providerProps, ...renderOptions }) => {
  //   return render(
  //     <LoadingContext.Provider {...providerProps}>
  //       {ui}
  //     </LoadingContext.Provider>,
  //     renderOptions,
  //   );
  // };

  test('renders login', () => {
    render(<Login />);
    // const loadingState = false;
    // const setLoadingState = jest.fn();
    // const providerProps = { value: [loadingState, setLoadingState] };
    // const providerProps2 = { value: { setCurrentUser: setLoadingState } };
    // customRender(
    //   <AuthContext.Provider {...providerProps2}>
    //     <Login />
    //   </AuthContext.Provider>,
    //   { providerProps },
    // );
    // render(
    //   <LoadingContext.Provider {...providerProps}>
    //     <AuthContext.Provider value={providerProps2}>
    //       <Login />
    //     </AuthContext.Provider>
    //   </LoadingContext.Provider>,
    // );
    // const div = document.createElement('div');
    // ReactDOM.render(<Login />, div);
  });
});
