import styles from './Product.module.css'; // Import css modules stylesheet as styles
import fakeApiResults from '../Main/fakeApiResults.js'; 
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import defaultImg from '../../img/nophoto.png';

function Product() {
  const dispatch=useDispatch();

  const productId = Number(document.location.search.match(/^\?id=.{1,}/)[0].slice(4)); //Берем id продукта из Get параметра
  const productData = useSelector((state)=>state.productList.List.find((item) => {return item.scu == productId})); //Берем данные о продукте из редакса
  const [newproductData, setNewproductData] = useState(productData);  //  Стейт для вводимых данных о продукции в режиме редактирования

  const autorization = useSelector((state)=>state.autorization);   //  Авторизирован ли пользователь

  const [editMod, setEditMod] = useState(false);  //  Активен ли режим редактирования

  const [amountOfAddingToBusket, setAmountOfAddingToBusket] = useState(1);

  function saveNewProductData() {
    console.log(newproductData.name)
    if (newproductData.name.trim().length >= 30) {   // 4 условия валидации введенных данных
      alert("Название не должно быть длиннее 30 символов")
      return
    };
    if (newproductData.description.trim().length >= 600) {
      alert("Описание не должно быть длиннее 600 символов")
      return
    };
    if (newproductData.name.trim().length === 0) {
      alert("Название не должно быть пустым")
      return
    };
    if (newproductData.description.trim().length === 0) {
      alert("Описание не должно быть пустым")
      return
    };  
    dispatch({type: "SAVE_NEW_PRODUCT_DATA", payload: newproductData});
    setEditMod(!editMod)
  }

  function addToBusket(amountOfAddingToBusket){
    productData.stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: productData.id, amount: amountOfAddingToBusket, price: productData.price}})
  }

    return (
      <main className={styles.main}>
        {editMod ? 
            <input  value = {newproductData.name} 
                    onInput ={(event) => {setNewproductData({...newproductData, name: event.target.value})}}/>
            : <h2>{productData.name}</h2>
        }
        <img src={!productData.img ? defaultImg : productData.img} alt="альтернативный текст" className={styles.img}></img>
        {editMod ? 
            <textarea  value = {newproductData.description} 
                    onInput ={(event) => {setNewproductData({...newproductData, description: event.target.value})}}/>
            : <div>{productData.description}</div>
        }
        {editMod ? 
            <input  value = {newproductData.stock} 
                    onInput ={(event) => {setNewproductData({...newproductData, stock: event.target.value})}}/>
            : <div>{"Осталось в наличии: " + productData.stock + " " + productData.units}</div>
        }
 
        <div>
          <input 
              value = {amountOfAddingToBusket} 
              className={styles.input} 
              type = "number" 
              onChange={(event) => {setAmountOfAddingToBusket(event.target.value)}}
            />
          <div onClick = {() => {addToBusket(Number(amountOfAddingToBusket))}}  className={styles.button}>
                  <p className={styles.buttonText}>
                    {autorization ? 
                          productData.stock ? "Добавить в корзину" : "Нет в наличии"
                    :
                      "Чтобы добавить товар в корзину залогинтесь"
                    }
                  </p>
          </div>
        </div>
        {/* Блок редактирования данных, показывается только если пользователь - админ */}
        {autorization === "admin" ?
          <div>
            {editMod ?
              <>
                <div onClick = {() => {saveNewProductData()}}  className={styles.button}>
                  <p className={styles.buttonText}>Сохранить</p>
                </div>
                <div onClick = {() => {setEditMod(!editMod)}}  className={styles.button}>
                  <p className={styles.buttonText}>Отмена</p>
                </div> 
             </>
            :  
              <div onClick = {() => {setEditMod(!editMod)}}  className={styles.button}>
                <p className={styles.buttonText}>Редактировать</p>
              </div>
            }
          </div>
        : null  
        }

      </main>
    
    );
}

export default Product;