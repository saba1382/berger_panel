import { Button, Checkbox, Drawer, Input, Space, Upload } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { product } from "../../utils/ProductType";
import InputTag from "./input";
import { PlusOutlined, ToTopOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { productList } from "../Product/MockData";

type IProps = {
  newProduct: any;
  productMode: any;
  editProduct: Function;
  createMode: Function;
};

const Drower: FC<IProps> = (props) => {
  const { newProduct, productMode, createMode, editProduct } = props;
  const inputRef = useRef<any>(null);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: Math.floor(Math.random() * 10000000),
    icon: "",
    title: "",
    weight: 0,
    Ingredients: [],
    price: 0,
    see: false,
    setting: true,
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onOpenDrower = () => {
    createMode();
    showDrawer()
  }

  const onClose = () => {
    setOpen(false);
  };

  const openPicker = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handlePickBtnClick = (e: any) => {
    e.preventDefault();
    openPicker();
  };

  const selectedImage = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const file = URL.createObjectURL(selectedFile);
    setFormData({ ...formData, icon: file });
  };

  const addIngredients = (e: any[]) => {
    setFormData({ ...formData, Ingredients: e });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.icon || formData.title === "" || formData.price === "") return;
    newProduct(formData);
    setFormData({
      id: Math.floor(Math.random() * 10000000),
      icon: "",
      title: "",
      weight: 0,
      Ingredients: [],
      price: 0,
      see: false,
      setting: true,
    });
    onClose();
  };

  const putDataToForm = () => {
    const id = localStorage.getItem('productId')
    const products = localStorage.getItem('products')
    const localData = products ? JSON.parse(products) : productList;
    const product = localData.filter((product:any) => product.id === JSON.parse(id ?? ''))
    showDrawer();
    setFormData({
      id: product[0].id,
      icon: product[0].icon,
      title: product[0].title,
      weight: product[0].weight,
      Ingredients: product[0].Ingredients,
      price: product[0].price,
      see: false,
      setting: true,
    });
  }

  const handleEditProduct = (e:any) => {
    e.preventDefault();
    const products = localStorage.getItem('products')
    const localData = products ? JSON.parse(products) : productList;
    const product = localData.findIndex((product:any) => product.id === formData.id);
    const data = localData[product] = formData;
    localStorage.setItem('products', JSON.stringify(localData));
    onClose();
    editProduct(localData)
  }

  useEffect(() => {
    if (!productMode) return;
    if (productMode.includes('Edit')) {
      setTimeout(() => {
        putDataToForm()
      }, 500);
      return;
    }else {
      setFormData({
        id: Math.floor(Math.random() * 10000000),
        icon: "",
        title: "",
        weight: 0,
        Ingredients: [],
        price: 0,
        see: false,
        setting: true,
      });
      return
    }
  }, [productMode])

  return (
    <div>
      <Space>
        <div className={styles.new_product_btn} onClick={onOpenDrower}>
          <span>+</span>
          <span>Add new</span>
          <span>Product</span>
        </div>
      </Space>
      <Drawer
        title={`${!productMode || productMode.includes('create') ? 'Add new' : 'Edit'} product`}
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <div>
          <form onSubmit={!productMode || productMode.includes('create') ? handleSubmit : handleEditProduct} className={styles.form}>
            <label className={styles.labelInput}>
              Name of the product
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </label>
            <label className={styles.labelInput}>
              Ingredients
              <div className={styles.input_tag}>
                <InputTag
                  ingredients={addIngredients}
                  clearTages={open}
                />
              </div>
            </label>
            <Checkbox
              checked={formData.see}
              onChange={(e) =>
                setFormData({ ...formData, see: e.target.checked })
              }
            >
              Suitable for vegans
            </Checkbox>
            <div className={styles.form_box}>
              <label className={styles.labelInput}>
                Weight in grams
                <Input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: +e.target.value })
                  }
                />
              </label>
              <label className={styles.labelInput}>
                Calories
                <Input type="text" name="---" />
              </label>
              <label className={styles.labelInput}>
                Price
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: +e.target.value })
                  }
                  prefix={"$"}
                />
              </label>
              <div className={styles.upload_image}>
                <div className={styles.label}>
                  <span>Upload Photo</span>
                  <span>JPG, PNG, max 2MB</span>
                </div>
              <input
                type="file"
                ref={inputRef}
                name="product_image"
                id="product_image"
                onChange={selectedImage}
                value={""}
                style={{ display: "none" }}
              />
              <button onClick={handlePickBtnClick} className={styles.button}>
              <ToTopOutlined />
                Choose Photo</button>
              </div>
            </div>
            <button type="submit" className={styles.btn_submit} disabled={formData.title == "" || formData.icon==="" || formData.price === ""}>
              <PlusOutlined /> {!productMode || productMode.includes('create') ? 'Add' : 'Edit'} product to the menu!
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default Drower;
