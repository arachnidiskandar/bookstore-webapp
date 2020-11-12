import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { ModalAlertContext } from '../contexts/ModalAlertContext';
import { LoadingContext } from '../contexts/LoadingContext';

const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
`;
const SyledForm = styled.form`
  display: ${(props) => (props.editing ? 'block' : 'none')};
`;
const StyledSpan = styled.span`
  color: ${(props) => (props.available ? 'green' : 'red')};
`;
const StyledLink = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const StyledInfoContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 40px;
  div:last-child {
    display: flex;
    justify-content: center;
    button {
      padding: 10px 20px;
      margin: 20px;
    }
  }
  form {
    input {
      width: 100%;
      margin-bottom: 10px;
    }
    div:last-child button:first-child {
      background-color: red;
    }
    textarea {
      width: calc(100% - 25px);
      height: 100px;
      border-radius: 5px;
      border: solid 1px #ccc;
      margin-bottom: 20px;
      font-size: 16px;
      padding: 10px;
      &:focus {
        outline: 0;
      }
    }
  }
  @media (max-width: 500px) {
    padding: 20px;
    margin-left: 0;
    margin-top: 30px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  margin-top: 15px;
  img {
    object-fit: cover;
    width: 450px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 500px) {
    img {
      width: 90vw;
    }
    flex-wrap: wrap;
  }
`;

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [modalAlertState, setModalAlertState] = useContext(ModalAlertContext);
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();

  const history = useHistory();

  const onSubmit = (data) => {
    const updatedBook = { id: parseInt(id, 10), ...data, available: true };
    if (JSON.stringify(updatedBook) === JSON.stringify(book)) {
      return;
    }
    setLoadingState(true);
    axios
      .put(`/books/${id}`, updatedBook)
      .then(() => {
        setBook(updatedBook);
        setModalAlertState({
          type: 'success',
          isOpen: true,
          message: 'Livro Atualizado',
        });
        setIsEditing(false);
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
  const mountedRef = useRef(true);
  useEffect(() => {
    setLoadingState(true);
    axios
      .get(`/books/${id}`)
      .then((res) => {
        if (!mountedRef.current) return null;
        setBook(res.data);
      })
      .catch((err) =>
        setModalAlertState({
          type: 'error',
          isOpen: true,
          message: err.message,
        }),
      )
      .finally(() => setLoadingState(false));
    return () => {
      mountedRef.current = false;
    };
  }, [id]);
  function fillForm() {
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('description', book.description);
  }
  const handleEditClick = () => {
    if (book.available) {
      fillForm();
      setIsEditing(true);
    } else {
      setModalAlertState({
        type: 'error',
        isOpen: true,
        message: 'Este livro está alugado',
      });
    }
  };
  const handleReserveClick = () => {
    setLoadingState(false);
    const updatedBook = { ...book, available: !book.available };
    axios
      .put(`/books/${id}`, updatedBook)
      .then(() => {
        setBook(updatedBook);
        setModalAlertState({
          type: 'success',
          isOpen: true,
          message: book.available ? 'Livro Reservado' : 'Livro Devolvido',
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
  return (
    <>
      <StyledLink onClick={() => history.push('/home')}>
        <BiArrowBack /> Voltar
      </StyledLink>
      <StyledContainer>
        <div>
          <img src="https://via.placeholder.com/500" alt="" />
        </div>
        <StyledInfoContainer>
          <SyledForm
            editing={isEditing}
            id="form-book-register"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div>
              <StyledLabel htmlFor="description">Descrição:</StyledLabel>
              <textarea
                name="description"
                id="description"
                ref={register({
                  required: { value: true, message: 'Descrição Inválida' },
                })}
              />
            </div>
            <div>
              <button onClick={() => setIsEditing(false)} type="button">
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </SyledForm>
          {!isEditing && (
            <>
              <h1>{book?.title}</h1>
              <StyledSpan available={book?.available}>
                {book?.available
                  ? 'Este livro está disponível'
                  : 'Este livro está alugado'}
              </StyledSpan>
              <h3>{book?.author}</h3>
              <p>{book?.description}</p>
              <div>
                <button onClick={handleReserveClick} type="button">
                  {book?.available ? 'Reservar' : 'Devolver'}
                </button>
                <button onClick={handleEditClick} type="button">
                  Editar
                </button>
              </div>
            </>
          )}
        </StyledInfoContainer>
      </StyledContainer>
    </>
  );
};

export default BookDetails;
