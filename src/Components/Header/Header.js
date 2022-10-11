import styles from './Header.module.css'; // Import css modules stylesheet as styles
import {Link} from "react-router-dom";

function Header() {
    return (
      <header className={styles.header}>
        <div className={styles.flexСontainer}>
            <Link to="/" ><div className={styles.menuPoint}>Главная</div></Link>
            <Link to="/about" ><div className={styles.menuPoint}>О магазине</div></Link>
        </div>
      </header>
    
    );
}

export default Header;