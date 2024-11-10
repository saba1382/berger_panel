import { Button, Checkbox, Drawer, Input, Space, Upload } from "antd";
import { FC, useRef, useState } from "react";
import { product } from "../../utils/ProductType";
import InputTag from "./input";
import { PlusOutlined, ToTopOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

type IProps = {
  newProduct: any;
};

const Drower: FC<IProps> = (props) => {
  const { newProduct } = props;
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

  return (
    <div>
      <Space>
        <div className={styles.new_product_btn} onClick={showDrawer}>
          <span>+</span>
          <span>Add new</span>
          <span>Product</span>
        </div>
      </Space>
      <Drawer
        title="Add new product"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
      >
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
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
              <PlusOutlined /> Add product to the menu!
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default Drower;
