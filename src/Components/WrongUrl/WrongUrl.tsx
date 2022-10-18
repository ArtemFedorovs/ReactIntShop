import styles from './WrongUrl.module.css'; 
import React from 'react';

function WrongUrl(): JSX.Element {
    return (
      <main className={styles.main}>
        <div className={styles.text}>Что-то пошло не так. Данной страницы не существует</div>
      </main>
    
    );
}

export default WrongUrl;