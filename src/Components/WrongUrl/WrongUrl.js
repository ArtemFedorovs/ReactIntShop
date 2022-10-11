import styles from './WrongUrl.module.css'; // Import css modules stylesheet as styles

function WrongUrl() {
    return (
      <main className={styles.main}>
        <div>Что-то пошло не так. Данной страницы не существует</div>
      </main>
    
    );
}

export default WrongUrl;