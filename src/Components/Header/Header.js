import styles from './Header.module.css'; // Import css modules stylesheet as styles
import {Link} from "react-router-dom";
import Modal from '../Modal/Modal.js';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';


function Header() {
  const [isModal, setModal] = useState(false);

  const autorization = useSelector((state)=>state.autorization);
  const dispatch=useDispatch();

    return (
      <header className={styles.header}>
        <div className={styles.flexСontainer}>
            <Link to="/" ><div className={styles.menuPoint}>Главная</div></Link>
            <Link to="/about" ><div className={styles.menuPoint}>О магазине</div></Link>
            {autorization ? 
              <div onClick = {() => {dispatch({type: "CHANGE_USER", payload: null})}} className={styles.autorization}>Выйти</div> :
              <div onClick = {() => {setModal(!isModal)}} className={styles.autorization}>Войти</div> 
            }   
        </div>
        <Modal isModal = {isModal} setModal = {setModal}/>
      </header>
    
    );
}

export default Header;