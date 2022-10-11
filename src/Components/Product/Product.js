import styles from './Product.module.css'; // Import css modules stylesheet as styles
import fakeApiResults from './fakeApiResults.js'; 
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import defaultImg from '../../img/nophoto.png';

function Product() {
  const dispatch=useDispatch();
  const [productData, setProductData] = useState({});
  const [amountOfAddingToBusket, setAmountOfAddingToBusket] = useState(1);

  useEffect(() => {
    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => {resolve(fakeApiResults)}, 100)
    });
    promise.then( (result) => {setProductData(result)} ) 
  }, []);

  const id = Number(document.location.search.match(/^\?id=.{1,}/)[0].slice(3)); //Берем id продукта из Get параметра

  function addToBusket(amountOfAddingToBusket){
    productData.stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: productData.id, amount: amountOfAddingToBusket, price: productData.price}})
}
    return (
      <main className={styles.main}>
        <h2>{productData.name}</h2>
        <img src={!productData.img ? defaultImg : productData.img} alt="альтернативный текст" className={styles.img}></img>
        <div>{productData.description}</div>
        {"Осталось в наличии: " + productData.stock + productData.units}
        <div>
          <input 
              value = {amountOfAddingToBusket} 
              className={styles.input} 
              type = "number" 
              onChange={(event) => {setAmountOfAddingToBusket(event.target.value)}}
            />
          <div onClick = {() => {addToBusket(Number(amountOfAddingToBusket))}}  className={styles.button}>
                  <p className={styles.buttonText}>{productData.stock ? "Добавить в корзину" : "Нет в наличии"}</p>
          </div>
        </div>

      </main>
    
    );
}

export default Product;