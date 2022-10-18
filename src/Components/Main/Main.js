import styles from './Main.module.css'; // Import css modules stylesheet as styles
import fakeApiResults from './fakeApiResults.js'; 
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductTile from '../ProductTile/ProductTile.js';

function Main() {
    const dispatch=useDispatch();

    useEffect(() => {  //При загрузке сайта имитируем запрос на сервер, на самом деле читаем обьект из другого файла и диспатчим результат.
        let promise = new Promise(function(resolve, reject) {
            setTimeout(() => {resolve(fakeApiResults)}, 100)
        });
        promise.then( (result)=>{ dispatch({type: "FETCH_DATA_SUCCESS", payload: result}) } )    
    }, []);

    const productList = useSelector((state)=>state.productList.List)

    return (
        <main className={styles.main}>
            <div className={styles.flexContainer}>
                {!productList ? null : productList.map((unit)=>
                                                <ProductTile
                                                    key ={unit.scu} 
                                                    id = {unit.scu} 
                                                    img = {unit.img} 
                                                    name = {unit.name} 
                                                    price = {unit.price} 
                                                    stock = {unit.stock}    
                                                />
                )}
            </div>
        </main>
    )              
}

export default Main;