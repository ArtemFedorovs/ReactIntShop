import styles from './Header.module.css';
import {Link} from "react-router-dom";
import Modal from '../Modal/Modal.js';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

import logInIcon from '../../icons/log-in.svg';
import logOutIcon from '../../icons/log-out.svg';
import infoIcon from '../../icons/info.svg';
import homePageIcon from '../../icons/home-page.svg';


function Header() {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [isModal, setModal] = useState(false); //стейт отображения модалки авторизации
  const autorization = useSelector((state)=>state.autorization); //возвращает имя позьзователя из редакса либо null если авторизация не выполнена
  
  function exit () {   //Выход из учетной записи
    navigate("/"); 
    dispatch({type: "CHANGE_USER", payload: null})
  }

    return (
      <header className={styles.header}>
        <div className={styles.flexСontainer}>
            <Link to="/" ><div className={styles.menuPoint}>  {/* Кнопка навигации - главная страница */}
              <img className={styles.icon} src={homePageIcon} />
              <div className={styles.buttonText}>Главная</div>      
            </div></Link>
            <Link to="/about" ><div className={styles.menuPoint}> {/* Кнопка навигации - О магазине */}
              <img className={styles.icon} src={infoIcon} />
              <div className={styles.buttonText}>О магазине</div> 
            </div></Link>
            {autorization ?   /* Кнопка входа/выхода */
              <div onClick = {() => {exit()}} className={styles.autorization}>
                <img className={styles.icon} src={logOutIcon}/>
                <div className={styles.buttonText}>Выйти</div>
              </div> :
              <div onClick = {() => {setModal(!isModal)}} className={styles.autorization}>
                <img className={styles.icon} src={logInIcon} />
                <div className={styles.buttonText}>Войти</div>
              </div> 
            }   
        </div>
        <Modal isModal = {isModal} setModal = {setModal}/>  {/*Модалка авторизации*/}
      </header>
    
    );
}

export default Header;