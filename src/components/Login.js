import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LoadingContext } from '../contexts/LoadingContext';

export const StyledInputContainer = styled.div`
  margin-bottom: 20px;
  input {
    margin-top: 5px;
  }
  span {
    color: red;
  }
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const StyledCard = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  width: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  button {
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding: 25px 0;
    border-radius: 10px;
    margin-top: 40px;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: 0;
    }
  }
  input {
    height: 50px;
    padding: 10px;
    width: 100%;
  }
  @media (max-width: 500px) {
    padding: 25px;
    button {
      height: 30px;
      font-size: 16px;
      padding: 20px 0;
      margin-top: 0px;
    }
    input {
      height: 40px;
      width: 100%;
      margin-bottom: 15px;
    }
  }
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;
const Login = () => {
  const history = useHistory();
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const { setCurrentUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const errorFieldMessage = (propName) =>
    errors[propName] ? errors[propName].message : '';
  const onSubmit = (data) => {
    setLoadingState(true);
    if (data.user === 'admin' && data.password === '102030') {
      setCurrentUser(data);
      history.push('/home');
      setLoadingState(false);
    }
  };
  return (
    <StyledContainer>
      <StyledCard>
        <h3>Bem Vindo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInputContainer>
            <label htmlFor="user">
              Usuário:
              <input
                name="user"
                id="user"
                type="text"
                ref={register({
                  required: { value: true, message: 'Usuário Inválido' },
                })}
              />
            </label>
            {errors.user && <span>{errorFieldMessage('user')}</span>}
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="password">
              Senha:
              <input
                name="password"
                id="password"
                type="password"
                autoComplete="current-password"
                ref={register({
                  required: { value: true, message: 'Senha Inválida' },
                })}
              />
            </label>
            {errors.password && <span>{errorFieldMessage('password')}</span>}
          </StyledInputContainer>
          <button type="submit">Entrar</button>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
