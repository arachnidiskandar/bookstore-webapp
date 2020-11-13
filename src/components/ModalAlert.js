import React, { useContext } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { ModalAlertContext } from '../contexts/ModalAlertContext';

const StyledSuccessIcon = styled(BsCheckCircle)`
  color: green;
  font-size: 50px;
`;
const StyledErrorIcon = styled(BsXCircle)`
  color: red;
  font-size: 50px;
`;
const StyledModal = styled(Modal)`
  background-color: white;
  width: 25%;
  border-radius: 20px;
  margin: auto;
  padding: 20px;
  text-align: center;
  h2 {
    margin: 30px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    width: 100px;
    margin: auto;
    margin-top: 20px;
  }
  &:focus {
    outline: 0;
  }
  @media (max-width: 500px) {
    width: 80%;
    h2 {
      margin: 10px;
    }
  }
`;
Modal.defaultStyles.overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  paddingTop: '10vh',
};

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const ModalAlert = () => {
  const [modalAlertState, setModalAlertState] = useContext(ModalAlertContext);

  return (
    <StyledModal isOpen={modalAlertState.isOpen}>
      {modalAlertState.type === 'success' ? (
        <StyledSuccessIcon />
      ) : (
        <StyledErrorIcon />
      )}
      <h2>{modalAlertState.message}</h2>
      <button
        type="button"
        onClick={() =>
          setModalAlertState((prevState) => {
            return { ...prevState, isOpen: false };
          })
        }
      >
        Ok
      </button>
    </StyledModal>
  );
};

export default ModalAlert;
