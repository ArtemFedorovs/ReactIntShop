import styles from './BasketPoint.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../app/store';
import React from 'react';

type PropType = {
  scu: string,
  amount: number,
}

function BasketPoint({scu, amount}: PropType) {
  const dispatch: AppDispatch = useDispatch();

  const orderData = useSelector((state: RootState) => state.productList && state.productList.find((item) => {return item.scu == Number(scu)})); //данные одной позиции в корзине

  function deleteFromBusket(): void {   //полное удаление одной позиции из корзины
    dispatch({type: "DELETE_FROM_BUSCET", payload: scu})
  }

    return ( orderData ?
        <tr data-testid = "busketRow" className={styles.row}>
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