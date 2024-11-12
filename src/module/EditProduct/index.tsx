import { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './styles.module.css'
import { productList } from '../Product/MockData';

type IProps = {
  isOpenModal: boolean;
  isCloseModal: Function;
  productId: string | number | null;
  editMode: Function;
  reloadAfterDelete: Function
}

const EditProduct: FC<IProps> = props => {
    
  const { isOpenModal=false, isCloseModal, productId, editMode, reloadAfterDelete } = props

  const [isModalOpen, setIsModalOpen] = useState(isOpenModal);

  const handleOk = () => {
    setIsModalOpen(false);
    isCloseModal(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    isCloseModal(false)
  };

  const deleteProduct = () => {
    const product = localStorage.getItem('products')
    const localData = product ? JSON.parse(product) : productList;
    const afterDeleteProduct = localData.filter((product:any) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(afterDeleteProduct))
    reloadAfterDelete(afterDeleteProduct);
    handleCancel();
  }

  const editProduct = () => {
    localStorage.setItem('productId', JSON.stringify(productId))
    editMode('Edit');
    handleCancel()
  }

  useEffect(() => {
    setIsModalOpen(isOpenModal);
  }, [isOpenModal])

  return (
    
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div>

        <br/>
        <br/>
        <Button type='primary' onClick={editProduct}>ویرایش محصول</Button>
        <Button type='primary' danger onClick={deleteProduct}>حذف محصول</Button>
      </div>
    </Modal>
  
  );
}

export default EditProduct