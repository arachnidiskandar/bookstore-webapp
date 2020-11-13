import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Book from './Book';
import { LoadingContext } from '../contexts/LoadingContext';
import { ModalAlertContext } from '../contexts/ModalAlertContext';
import BookCreation from './BookCreation';
import { BooksInfoContext } from '../contexts/BooksInfoContext';

const StyledSearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  input {
    width: 30%;
  }
  button {
    padding: 10px;
  }
  @media (max-width: 1024px) {
    input {
      width: 50%;
    }
  }
  @media (max-width: 500px) {
    padding: 10px;
    justify-content: center;
    flex-direction: column;
    input {
      margin-bottom: 15px;
      width: 100%;
    }
  }
`;
const StyledContainer = styled.div`
  padding: 30px;
  background-color: transparent;
  width: 100%;
  border-radius: 20px;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const StyledHeader = styled.div`
  padding: 15px;
  display: flex;
  font-weight: bold;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;
const StyledTableItems = styled.div`
  div:first-child {
    display: flex;
  }
`;

const StyledTable = styled.div`
  background-color: transparent;
  border-radius: 10px;
  ${StyledTableItems}, ${StyledHeader} {
    span:first-child {
      flex-basis: 50%;
    }
    span:nth-child(2) {
      flex-basis: 20%;
    }
    div:last-child {
      flex-basis: 30%;
    }
  }
  input {
    width: 50%;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
    ${StyledHeader} {
      font-size: 14px;
      span:first-child {
        flex-basis: 70%;
      }
      span:nth-child(2) {
        flex-basis: 30%;
      }
      div:last-child {
        flex-basis: 0;
      }
    }
    ${StyledTableItems} {
      span:first-child {
        flex-basis: 70%;
      }
      span:nth-child(2) {
        flex-basis: 30%;
      }
      div:last-child {
        flex-basis: 100%;
      }
    }
  }
  @media (max-width: 800px) {
    ${StyledTableItems}, ${StyledHeader} {
      span:nth-child(2) {
        flex-basis: 25%;
      }
    }
  }
`;

const BooksList = () => {
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const [modalAlertState, setModalAlertState] = useContext(ModalAlertContext);
  const [booksInfo, setBooksInfo] = useContext(BooksInfoContext);

  useEffect(() => {
    setLoadingState(true);
    axios
      .get('/books')
      .then((res) =>
        setBooksInfo((prevState) => {
          return { ...prevState, books: res.data };
        }),
      )
      .catch((err) =>
        setModalAlertState({
          type: 'error',
          isOpen: true,
          message: err.message,
        }),
      )
      .finally(() => setLoadingState(false));
  }, []);

  const [filterState, setFilterState] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`books?title_like=${filterState}`)
        .then((res) =>
          setBooksInfo((prevState) => {
            return { ...prevState, books: res.data };
          }),
        )
        .finally(() => setLoadingState(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [filterState]);
  const handleButtonCreateBook = () =>
    setBooksInfo((prevState) => {
      return { ...prevState, isModalOpen: true };
    });
  return (
    <>
      <StyledContainer>
        <StyledSearchBarContainer>
          <input
            onChange={(e) => setFilterState(e.target.value)}
            type="text"
            name="searchBook"
            id="searchBook"
            placeholder="Digite o nome do livro..."
          />
          <button onClick={handleButtonCreateBook} type="button">
            Cadastrar Livro
          </button>
        </StyledSearchBarContainer>
        <h3>Lista de Livros Cadastrados</h3>
        <StyledTable>
          <StyledHeader>
            <span>Nome</span>
            <span>Status</span>
            <div />
          </StyledHeader>
          <StyledTableItems>
            {booksInfo.books &&
              booksInfo.books.map((book) => <Book key={book.id} book={book} />)}
            {booksInfo.books.length === 0 && (
              <StyledTableItems>
                <span>Nenhum Livro Encontrado</span>
              </StyledTableItems>
            )}
          </StyledTableItems>
        </StyledTable>
      </StyledContainer>
      {booksInfo.isModalOpen && <BookCreation />}
    </>
  );
};

export default BooksList;
