import styles from './ProductTile.module.css'; // Import css modules stylesheet as styles
import defaultImg from '../../img/nophoto.png';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

function ProductTile({id, img, name, price, stock}) {
    const dispatch=useDispatch();
    function addToBusket(){
        stock && dispatch({type: "ADD_TO_BUSCET", payload: {id: id, price: price, amount: 1}})
    }
    return (
        <div className={styles.tile}>
            <Link to={"/product?id=" + id} >
                <div className={styles.name}>{name}</div>
            </Link>
            <img src={!img ? defaultImg : img} alt="альтернативный текст" className={styles.img}></img>
            <div className={styles.price}>{price}</div>
            <div onClick={() => {addToBusket()}}  className={styles.button}>
                 <p className={styles.buttonText}>{stock ? "Добавить в корзину" : "Нет в наличии"}</p>
            </div>
        </div>

    
    );
}

export default ProductTile;

