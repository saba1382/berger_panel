import { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.css'

type IProps = {
  isOpenModal: boolean;
  isCloseModal: Function;
  productId: string | number | null
}

const EditProduct: FC<IProps> = props => {
    
  const { isOpenModal=false, isCloseModal, productId } = props

  const [isModalOpen, setIsModalOpen] = useState(isOpenModal);

  const handleOk = () => {
    setIsModalOpen(false);
    isCloseModal(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    isCloseModal(false)
  };

  useEffect(() => {
    setIsModalOpen(isOpenModal);
    console.log('first id', productId);
  }, [isOpenModal])

  return (
    
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div>
        به دلیل نبود طرح این بخش انجام نشده
        <br/>
        <br/>
        <br/>
        <p>Product Id: {productId}</p>
      </div>
    </Modal>
  
  );
}

export default EditProduct