import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from 'react-modal';
import { ModalAlertContext } from '../contexts/ModalAlertContext';
import { BooksInfoContext } from '../contexts/BooksInfoContext';

const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  button {
    padding: 10px;
    margin: 0 5px;
    width: 100px;
    font-size: 16px;
  }
  button:first-child {
    background-color: red;
  }
`;
const StyledModal = styled(Modal)`
  background-color: white;
  width: 25%;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: auto;
  form input {
    width: 100%;
    margin-bottom: 10px;
  }
  &:focus {
    outline: 0;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;
const BookCreation = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const [booksInfo, setBooksInfo] = useContext(BooksInfoContext);
  const [modalAlertState, setModalAlertState] = useContext(ModalAlertContext);

  const onSubmit = (data) => {
    const newBook = { ...data, available: true };
    axios
      .post('/books', newBook)
      .then(() => {
        setBooksInfo((prevState) => {
          return {
            books: [...prevState.books, newBook],
            isModalOpen: false,
          };
        });
        setModalAlertState({
          type: 'success',
          isOpen: true,
          message: 'Livro Cadastrado com sucesso',
        });
      })
      .catch((err) => {
        setModalAlertState({
          type: 'error',
          isOpen: true,
          message: err.message,
        });
      });
  };
  const handleCloseEvent = () =>
    setBooksInfo((prevState) => {
      return { ...prevState, isModalOpen: false };
    });
  return (
    <StyledModal
      isOpen={booksInfo.isModalOpen}
      onRequestClose={handleCloseEvent}
    >
      <h3>Cadastre um Livro</h3>
      <form id="form-book-register" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <StyledLabel htmlFor="title">Título:</StyledLabel>
          <input
            name="title"
            id="title"
            type="text"
            ref={register({
              required: { value: true, message: 'Título Inválido' },
            })}
          />
        </div>
        <div>
          <StyledLabel htmlFor="author">Autor:</StyledLabel>
          <input
            name="author"
            id="author"
            type="text"
            ref={register({
              required: { value: true, message: 'Nome Inválido' },
            })}
          />
        </div>
      </form>
      <StyledButtonContainer>
        <button onClick={handleCloseEvent} type="button">
          Cancelar
        </button>
        <button type="submit" form="form-book-register">
          Cadastrar
        </button>
      </StyledButtonContainer>
    </StyledModal>
  );
};

export default BookCreation;
