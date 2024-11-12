import { FC, useEffect, useState } from 'react';
import styles from './style.module.css'
import { SettingFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import Drower from '../drower';
import { product } from '../../utils/ProductType';
import { productList } from './MockData'
import EditProduct from '../EditProduct';

type IProps = {

}

const Product: FC<IProps> = props => {

    const [newProduct, setNewProduct] = useState<product>();
    const [productId, setProductId] = useState<string | number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [allProducts, setAllProducts] = useState<any>();
    const [productMode, setProductMode] = useState<any>();
    const [reloadAfterEdit, setReloadAfterEdit] = useState<any>();
    const [afterDelete, setAfterDelete] = useState<any>()


    const handleNewProduct = (product: product) => {
        setNewProduct(product)
    }

    const handelOpenModal = (id: any) => {
        setShowModal(true);
        setProductId(id);
    }

    const handleClose = (closeModal: any) => {
        setShowModal(closeModal)
    }

    const handleCreateMode = () => {
        setProductMode('create');
    }

    const handleEditMode = () => {
        setProductMode(`Edit ${productId}`)
    }

    const onEditProduct = (e:any) => {
        setReloadAfterEdit(e);
    }

    const reloadAfterDelete = (e:any) => {
        setAfterDelete(e)
    }

    useEffect(() => {
        if (!afterDelete) return;
        const product = localStorage.getItem('products')
        const localData = product ? JSON.parse(product) : productList;
        setAllProducts(localData)
    }, [afterDelete])

    useEffect(() => {
        if (!reloadAfterEdit) return;
        const product = localStorage.getItem('products')
        const localData = product ? JSON.parse(product) : productList;
        setAllProducts(localData)
    }, [reloadAfterEdit])

    useEffect(() => {
        if (newProduct == null) return;
        let data = [...allProducts, newProduct]
        localStorage.setItem('products', JSON.stringify(data));
        setAllProducts(data)
    }, [newProduct])

    useEffect(() => {
        const product = localStorage.getItem('products')
        const localData = product ? JSON.parse(product) : productList;
        setAllProducts(localData)
    }, [])

    return (
        <div className={styles.products}>
            {
                allProducts && allProducts.map((product:product) => (
                    <div className={styles.product} key={product.id}>
                        <img src={product.icon} />
                        <span className={styles.title}>{product.title}</span>
                        <span className={styles.weight}>{product.weight}g</span>
                        <div className={styles.ingredient}>
                            {product.Ingredients.map(ingredient => (
                                <span className={styles.about}>{ingredient},</span>
                            )) }
                        </div>
                        <div className={styles.footer}>
                            <span>${product.price}</span>
                            <div>
                                <div className={`${product.see ? '' : styles.not_active} ${styles.border} `}>
                                    {
                                        product.see ? <EyeFilled/> : <EyeInvisibleFilled/>
                                    }
                                </div>
                                <div className={styles.border}>
                                    <SettingFilled onClick={() => handelOpenModal(product.id)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className={styles.add_product}>
                <Drower newProduct={handleNewProduct} productMode={productMode} createMode={handleCreateMode} editProduct={onEditProduct}/>
            </div>
            <EditProduct isOpenModal={showModal} isCloseModal={handleClose} productId={productId} editMode={handleEditMode} reloadAfterDelete={reloadAfterDelete}/>
        </div>
    );
};

export default Product;