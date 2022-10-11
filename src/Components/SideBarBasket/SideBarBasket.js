import styles from './SideBarBasket.module.css'; // Import css modules stylesheet as styles
import {useSelector} from 'react-redux';

function SideBarBasket() {
    const busket = useSelector(state=> state.busket);
    const prodNumber = Object.values(busket).reduce((sum, elem)=> sum + elem.amount, 0);
    const total = Object.values(busket).reduce((sum, elem)=> sum + elem.total, 0);
    console.log(Object.values(busket))
    return (
        <aside className={styles.sideBar}>
            <p>В корзине товаров: {prodNumber} шт. </p> 
            <p>На сумму {total}</p>
          
        </aside>

    
    );
}

export default SideBarBasket;