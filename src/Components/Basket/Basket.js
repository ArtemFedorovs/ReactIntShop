import styles from './Basket.module.css'; 
import {useSelector} from 'react-redux';
import BasketPoint from '../BasketPoint/BasketPoint.js';

function Basket() {
  const basket = useSelector(state=>Object.entries(state.busket));
  
    return (
      <main className={styles.main}>
        <h2>Корзина</h2>
        <table className={styles.fullWidth}>
        <tbody className={styles.fullWidth}>
          <tr className={styles.row}>
            <th className={styles.cell1}>Id</th>
            <th className={styles.cell2}>Наименование</th>
            <th className={styles.cell3}>Цена</th>
            <th className={styles.cell4}>Кол-во</th>
            <th className={styles.cell5}>Стоимость</th>
            <th className={styles.cell6}></th>
          </tr>
            {Object.entries(basket).map((elem)=><BasketPoint key = {elem[1][0]} scu = {elem[1][0]} amount  = {elem[1][1].amount}/>)}
        </tbody>
        </table>
      </main>
    
    );
}

export default Basket;