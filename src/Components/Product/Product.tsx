import styles from './Product.module.css';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import defaultImg from '../../img/nophoto.png';
import {useNavigate} from "react-router-dom";
import {RootState, AppDispatch, ProductInfoType } from '../../app/store'; //типы

function Product(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const productsData = useSelector((state: RootState)=>state.productList);  //Берем данные о продукте из редакса

  let productId: any = document.location.search.match(/^\?id=.{1,}/); //Берем id продукта из Get параметра
  productId && (productId = String(productId[0]).slice(4))
  
  const productData = (!productsData || !productId) ? null : productsData.find((item) => {return item.scu == productId})
  useEffect(   //редирект на главную в случае, если данных нет
    () => {(!productsData || !productId)  && navigate("/")},
    []
  )
  
  const [newproductData, setNewproductData] = useState<ProductInfoType | null | undefined>(productData);  //  Стейт для вводимых данных о продукции в режиме редактирования

  const autorization = useSelector((state: RootState) => state.autorization);   //  Авторизирован ли пользователь

  const [editMod, setEditMod] = useState<boolean>(false);  //  Активен ли режим редактирования

  const [amountOfAddingToBusket, setAmountOfAddingToBusket] = useState<number>(1);

  function saveNewProductData() {
    
    if (newproductData && newproductData.name.trim().length >= 30) {   // 4 условия валидации введенных данных
      alert("Название не должно быть длиннее 30 символов")
      return
    };
    if (newproductData && newproductData.description.trim().length >= 600) {
      alert("Описание не должно быть длиннее 600 символов")
      return
    };
    if (newproductData && newproductData.name.trim().length === 0) {
      alert("Название не должно быть пустым")
      return
    };
    if (newproductData && newproductData.description.trim().length === 0) {
      alert("Описание не должно быть пустым")
      return
    };  
    dispatch({type: "SAVE_NEW_PRODUCT_DATA", payload: newproductData});
    setEditMod(!editMod)
  }

  function addToBusket(amountOfAddingToBusket: number){
    autorization && productData && productData.stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: productData.scu, amount: amountOfAddingToBusket, price: productData.price, limit: productData.stock}})
  }

  function limitChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if ((+e.target.value > 0) && (+e.target.value < 100)) {
      newproductData && setNewproductData({...newproductData, stock: + e.target.value})
    }
  }

  function orderNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if ((+e.target.value > 0) && (+e.target.value < 100)) {
      setAmountOfAddingToBusket(+e.target.value)
    }
  }

  function productNameInputChange (e: React.ChangeEvent<HTMLInputElement>): void {
    newproductData && setNewproductData({...newproductData, name: e.target.value})
  };

  function productDescriptioInputChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
    newproductData && setNewproductData({...newproductData, description: e.target.value})
  };

    return (
      <main className={styles.main}>
        {editMod ?  /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <input className={styles.editInput}  value = {newproductData?.name} 
                    onChange = {(event) => productNameInputChange(event)}/>
            : <h2>{productData?.name}</h2>
        }
        <img src={!productData?.img ? defaultImg : require(`../../img/${productData.img}.jpg`)} alt="альтернативный текст" className={styles.img}></img>
        {editMod ?  /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <textarea className={styles.editTextarea}  value = {newproductData?.description} 
                    onChange = {(event) => {productDescriptioInputChange(event)}}/>
            : <div className={styles.description}>{productData?.description}</div>
        }
        {editMod ? /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <input type = "number" className={styles.editInput}  value = {newproductData?.stock} min = {1} max = {99}
                onChange = {(event) => {limitChange(event)}}/>
            : <div className={styles.description}>{"Осталось в наличии: " + productData?.stock + " " + productData?.units}</div>
        }
 
        <div>
          <input
              value = {amountOfAddingToBusket} 
              className={styles.amountInput} 
              type = "number" 
              onChange={(event) => {orderNumberChange(event)}}
            />
          <div onClick = {() => {addToBusket(Number(amountOfAddingToBusket))}}  className={styles.button}>
                  <p className={styles.buttonText}>
                    {autorization ? 
                          productData?.stock ? "Добавить в корзину" : "Нет в наличии"
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
                <div onClick = {() => {saveNewProductData()}}  className={styles.buttonHalfWidth}>
                  <p className={styles.buttonText}>Сохранить</p>
                </div>
                <div onClick = {() => {setEditMod(!editMod)}}  className={styles.buttonHalfWidth}>
                  <p className={styles.buttonText}>Отмена</p>
                </div> 
             </>
            :  
              <div onClick = {() => {setEditMod(!editMod)}}  className={styles.editButton}>
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