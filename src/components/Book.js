import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ModalAlertContext } from '../contexts/ModalAlertContext';
import { BooksInfoContext } from '../contexts/BooksInfoContext';
import { LoadingContext } from '../contexts/LoadingContext';

const StyledModalContainer = styled.div`
  margin-top: 10vh;
  background-color: white;
  width: 25%;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: default;
  height: 150px;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    font-size: 18px;
    button:first-child {
      background-color: red;
      margin-right: 20px;
    }
    button {
      padding: 10px;
    }
  }
`;
const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: white;
  border-radius: 20px;
  margin: 10px 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  div:last-child {
    display: flex;
    justify-content: space-around;
  }
  &:hover {
    background-color: lightgray;
  }
  button {
    padding: 10px;
    border-radius: 20px;
  }
  span:first-child {
    flex-basis: 50%;
    word-break: break-word;
    padding-right: 10px;
  }
  span:nth-child(2) {
    flex-basis: 20%;
  }
  div:last-child {
    flex-basis: 30%;
    button:last-child {
      background-color: red;
      font-size: 18px;
    }
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    span:first-child {
      flex-basis: 70%;
    }
    span:nth-child(2) {
      flex-basis: 30%;
    }
    div:last-child {
      flex-basis: 100%;
      margin-top: 15px;
      button {
        font-size: 12px;
      }
      button:last-child {
        font-size: 16px;
      }
    }
  }
  @media (max-width: 800px) {
    button {
      margin: 5px;
    }
  }
`;
const Book = ({ book }) => {
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const [bookState, setBookState] = useState(null);
  const history = useHistory();
  const [modalAlertState, setModalAlertState] = useContext(ModalAlertContext);
  const [booksInfo, setBooksInfo] = useContext(BooksInfoContext);

  const handleClickDetails = () => history.push(`book/${bookState.id}`);

  const handleReserveClick = () => {
    setLoadingState(true);
    const updatedBook = { ...bookState, available: !bookState.available };
    axios
      .put(`/books/${bookState.id}`, updatedBook)
      .then(() => {
        setBookState(updatedBook);
        setModalAlertState({
          type: 'success',
          isOpen: true,
          message: bookState.available ? 'Livro Reservado' : 'Livro Devolvido',
        });
      })
      .catch((err) =>
        setModalAlertState({
          type: 'error',
          isOpen: true,
          message: err.message,
        }),
      )
      .finally(() => setLoadingState(false));
  };
  useEffect(() => {
    setBookState(book);
  }, [book]);
  const onDeleteConfirm = () => {
    setLoadingState(true);
    axios
      .delete(`/books/${bookState.id}`)
      .then(() => {
        setBooksInfo((prevState) => {
          return {
            ...prevState,
            books: prevState.books.filter(
              (bookToCheck) => bookToCheck.id !== bookState.id,
            ),
          };
        });
        setModalAlertState({
          type: 'success',
          isOpen: true,
          message: 'Livro Deletado',
        });
      })
      .catch((err) =>
        setModalAlertState({
          type: 'error',
          isOpen: true,
          message: err.message,
        }),
      )
      .finally(() => setLoadingState(false));
  };
  const handleDelete = () => {
    if (!book.available) {
      setModalAlertState({
        type: 'error',
        isOpen: true,
        message: 'Este livro está alugado',
      });
      return;
    }
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <StyledOverlay className="custom-ui" onClick={onClose}>
            <StyledModalContainer>
              <h1>Voce tem certeza?</h1>
              <div>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={(() => onClose, onDeleteConfirm)}
                >
                  Sim
                </button>
              </div>
            </StyledModalContainer>
          </StyledOverlay>
        );
      },
    });
  };

  return (
    <>
      <StyledItem>
        <span>{bookState?.title}</span>
        <span>{bookState?.available ? 'Disponível' : 'Alugado'}</span>
        <div>
          <button onClick={handleClickDetails} type="button">
            Ver Detalhes
          </button>
          <button onClick={handleReserveClick} type="button">
            {bookState?.available ? 'Reservar' : 'Devolver'}
          </button>
          <button onClick={handleDelete} type="button">
            <RiDeleteBin6Line />
          </button>
        </div>
      </StyledItem>
    </>
  );
};

export default Book;
