import styles from './ProductTile.module.css'; // Import css modules stylesheet as styles
import defaultImg from '../../img/nophoto.png';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";

function ProductTile({id, img, name, price, stock}) {
    const dispatch=useDispatch();
    const autorization = useSelector((state)=>state.autorization); //  Авторизирован ли пользователь

    function addToBusket(){
        autorization && stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: id, price: price, amount: 1, limit: stock}})
    }

    return (
        <div className={styles.tile}>
            <Link to={"/product?id=" + id} >
                <div className={styles.name}>{name}</div>
            </Link>
            <img src={!img ? defaultImg : require(`../../img/${img}.jpg`)} alt="альтернативный текст" className={styles.img}></img>
            <div className={styles.price}>{price} р.</div>
            <div onClick={() => {addToBusket()}}  className={styles.button}>
                <p className={styles.buttonText}> 
                    {autorization ? 
                        stock ? "Добавить в корзину" : "Нет в наличии"
                    :
                    "Чтобы добавить товар в корзину залогинтесь"
                    }
                </p>
            </div>
        </div>

    
    );
}

export default ProductTile;

