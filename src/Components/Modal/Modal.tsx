import styles from './Modal.module.css'; 
import {fakeApiResults} from './fakeApiResults.js'; 
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {AppDispatch} from '../../app/store'; //типы

type PropType = {
  isModal: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
}

function Modal({isModal, setModal}: PropType) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [fakeFetchStatus, setFakeFetchStatus] = useState<boolean>(false);  //state необходимый для того чтобы отключить некоторые функции на время проверки пароля
  const [login, setLogin] = useState<string>(""); //state для поля input (login)
  const [password, setPassword] = useState<string>(""); //state для поля input (password)
  const [AutorizationError, setAutorizationError] = useState<string | null>(null);  //state оштбки при авторизации

  function checkPassword(login: string, password: string): void {
    setFakeFetchStatus(true); // отключаем возможность свернуть окно/меняем текст в кнопке
    let autorizationPromise = new Promise(function(resolve, reject) {  // проверяем логин и пароль и возвращием имя пользователя в случае удачи, иначе null
      setTimeout(() => {resolve(fakeApiResults(login, password))}, 1000)
    });
    autorizationPromise.then( (result) => { if(result) { 
        setModal(false);  //закрываем модалку
        dispatch({type: "CHANGE_USER", payload: result}); //диспатчим имя пользователя
        setFakeFetchStatus(false); // включем обратно возможность свернуть окно/меняем текст в кнопке
        setAutorizationError(null);  // обнуляем ошибку авторизации в случае если до этого вход был неудачным
        navigate("/")
      } else {
        setAutorizationError("Неверные логин и/или пароль!");  //устанавливаем  ошибку авторизации 
        setFakeFetchStatus(false); // включем обратно возможность свернуть окно/меняем текст в кнопке
      }})
  }

    return (
      isModal ? 
        <div className = {styles.mainContainer}> 
          <div className={styles.modal}>
            <div className={styles.close} onClick = {() => {!fakeFetchStatus && setModal(!isModal)}}>X</div>
            <div className={styles.inputLine}>
              <label>Логин</label>
              <input value = {login} onChange ={(event) => {setLogin(event.target.value)}} type = "text"></input>
            </div>
            <div className={styles.inputLine}>
              <label>Пароль</label>
              <input value = {password} onChange ={(event) => {setPassword(event.target.value)}} type = "text"></input>
            </div>
            
              {AutorizationError ? <div className={styles.inputLine}>{AutorizationError}</div> : null} {/* выводим ощибку авторизации если такая есть*/}
  
            <div className={styles.buttonLine}>  {/* кнопки*/}
              <div onClick = {() => {!fakeFetchStatus && checkPassword(login, password)}}  className={styles.button}>
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