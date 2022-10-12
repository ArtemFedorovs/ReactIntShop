import styles from './Modal.module.css'; 
import {fakeApiResults} from './fakeApiResults.js'; 
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";

function Modal({isModal, setModal}) {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [fakeFetchStatus, setFakeFetchStatus] = useState(false);  //state необходимый для того чтобы отключить некоторые фуекции на время проверки пароля
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [AutorizationError, setAutorizationError] = useState(null);

  function checkPassword() {
    setFakeFetchStatus(true);
    let autorizationPromise = new Promise(function(resolve, reject) {
      setTimeout(() => {resolve(fakeApiResults(login, password))}, 1000)
    });
    autorizationPromise.then( (result) => { if(result) {
        setModal(false);
        dispatch({type: "CHANGE_USER", payload: result});
        setFakeFetchStatus(false);
        navigate("/")
      } else {
        setAutorizationError("Неверные логин и/или пароль");
        setFakeFetchStatus(false);
      }})
  }

    return (
      isModal ? 
        <div className = {styles.mainContainer}> 
          <div className={styles.modal}>
            <div className={styles.close} onClick = {() => {setModal(!isModal)}}>X</div>
            <div className={styles.inputLine}>
              <label>Логин</label>
              <input value = {login} onInput ={(event) => {setLogin(event.target.value)}} type = "text"></input>
            </div>
            <div className={styles.inputLine}>
              <label>Пароль</label>
              <input value = {password} onInput ={(event) => {setPassword(event.target.value)}} type = "text"></input>
            </div>
            <div className={styles.inputLine}>
              {AutorizationError ? <div className={styles.inputLine}>{AutorizationError}</div> : null} 
            </div>
            <div className={styles.buttonLine}>
              <div onClick = {() => {!fakeFetchStatus && checkPassword()}}  className={styles.button}>
                    <p className={styles.buttonText}>{fakeFetchStatus ? "Проверка" : "Войти"}</p>
              </div>
              <div onClick = {() => {setModal(!isModal)}}  className={styles.button}>
                    <p className={styles.buttonText} >Отмена</p>
              </div>
            </div>
          </div>
        </div>
      : null
    );
}

export default Modal;