import styles from './BasketPoint.module.css';
import {useDispatch, useSelector} from 'react-redux';

function BasketPoint({scu, amount}) {
  const dispatch=useDispatch();

  const orderData = useSelector((state)=>state.productList.List.find((item) => {return item.scu == scu})); //данные одной позиции в корзине

  function deleteFromBusket(){   //полное удаление одной позиции из корзины
    dispatch({type: "DELETE_FROM_BUSCET", payload: scu})
  }

    return ( orderData ?
        <tr className={styles.row}>
          <td className={styles.cell1}>{scu}</td>
          <td className={styles.cell2}>{orderData.name}</td>
          <td className={styles.cell3}>{orderData.price} р.</td>
          <td className={styles.cell4}>{amount}</td>
          <td className={styles.cell5}>{orderData.price * amount} р.</td>
          <td className={styles.cell6} onClick = {() => {deleteFromBusket()}}><div >X</div></td>
        </tr>
        : null
    );
}

export default BasketPoint;