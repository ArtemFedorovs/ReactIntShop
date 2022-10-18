import styles from './WrongUrl.module.css'; 

function WrongUrl() {
    return (
      <main className={styles.main}>
        <div className={styles.text}>Что-то пошло не так. Данной страницы не существует</div>
      </main>
    
    );
}

export default WrongUrl;