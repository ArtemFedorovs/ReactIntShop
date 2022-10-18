import styles from './SideBarBasket.module.css'; // Import css modules stylesheet as styles
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import basket from '../../icons/basket.svg';

function SideBarBasket() {
    const busket = useSelector(state => state.busket);
    const prodNumber = Object.values(busket).reduce((sum, elem) => sum + elem.amount, 0);
    const total = Object.values(busket).reduce((sum, elem) => sum + elem.total, 0);

    return (
        <Link to="/basket" >
            <aside className={styles.sideBar}>
                <div className={styles.textBlock}>
                    <p>В корзине товаров: {prodNumber} шт. </p> 
                    <p>На сумму {total} рублей</p> 
                </div>
                <img className={styles.icon} src={basket}/>
            </aside> 
        </Link>           
    );
}

export default SideBarBasket;