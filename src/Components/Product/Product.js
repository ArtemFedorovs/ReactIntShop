import styles from './Product.module.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import defaultImg from '../../img/nophoto.png';
import {useNavigate} from "react-router-dom";

function Product() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const productId = Number(document.location.search.match(/^\?id=.{1,}/)[0].slice(4)); //Берем id продукта из Get параметра

  const productsData = useSelector((state)=>state.productList.List);  //Берем данные о продукте из редакса
  const productData = !productsData? {} : productsData.find((item) => {return item.scu == productId})
  useEffect(   //редирект на главную в случае, если данных нет
    () => {!productsData && navigate("/")},
    []
  )
  
  const [newproductData, setNewproductData] = useState(productData);  //  Стейт для вводимых данных о продукции в режиме редактирования

  const autorization = useSelector((state)=>state.autorization);   //  Авторизирован ли пользователь

  const [editMod, setEditMod] = useState(false);  //  Активен ли режим редактирования

  const [amountOfAddingToBusket, setAmountOfAddingToBusket] = useState(1);

  function saveNewProductData() {
    
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
    autorization && productData.stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: productData.id, amount: amountOfAddingToBusket, price: productData.price, limit: productData.stock}})
  }

  function limitChange(value) {
    if ((value > 0) && (value < 100)) {
      setNewproductData({...newproductData, stock: + value})
    }
  }

  function orderNumberChange(value) {
    if ((value > 0) && (value < 100)) {
      setAmountOfAddingToBusket(value)
    }
  }

    return (
      <main className={styles.main}>
        {editMod ?  /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <input className={styles.editInput}  value = {newproductData.name} 
                    onInput ={(event) => {setNewproductData({...newproductData, name: event.target.value})}}/>
            : <h2>{productData.name}</h2>
        }
        <img src={!productData.img ? defaultImg : require(`../../img/${productData.img}.jpg`)} alt="альтернативный текст" className={styles.img}></img>
        {editMod ?  /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <textarea className={styles.editTextarea}  value = {newproductData.description} 
                    onInput ={(event) => {setNewproductData({...newproductData, description: event.target.value})}}/>
            : <div className={styles.description}>{productData.description}</div>
        }
        {editMod ? /*В зависимости от того, включен ли режим редактирования показываем либо поля либо инпут для его изменения */
            <input className={styles.editInput}  value = {newproductData.stock} min = {1} max = {99}
                    onInput ={(event) => {limitChange(event.target.value)}}/>
            : <div className={styles.description}>{"Осталось в наличии: " + productData.stock + " " + productData.units}</div>
        }
 
        <div>
          <input
              value = {amountOfAddingToBusket} 
              className={styles.amountInput} 
              type = "number" 
              onChange={(event) => {orderNumberChange(event.target.value)}}
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