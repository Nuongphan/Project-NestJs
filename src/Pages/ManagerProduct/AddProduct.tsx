import { useDispatch } from "react-redux";
import { formattedDate } from "../ManagerReport/ManagerReport";
import TinyMCEEditor from "./TinyMCEEditor";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { addProduct } from "../../redux/Action/ProductAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";

export function AddProduct() {
  // const [selectedFile, setSelectedFile] = useState<File | null>();
  // console.log("selectedFile: " ,selectedFile);
  const [images, setImages] = useState<any>([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [descriptions, setDescriptions] = useState("");
  const dispatch = useDispatch();
  const productEdit = useSelector((state: any) => state?.products?.editProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(0);
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [quantity, setQuantity] = useState<any>(0);
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);


  const type = useSelector((state: any) => state?.products?.type);
  console.log(type, "typeeee");

  useEffect(() => {
    if (productEdit) {
      setName(productEdit?.name || "");
      setQuantity(productEdit?.stock || 0);
      setPrice(productEdit?.price || 0);
      setSelected(productEdit?.category?.id || 0);
      setDescriptions(productEdit?.description || "");
    }
    if (type === "Add") {
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
      setSelected(0)
    }
  }, []);
  function handleDescriptionChange(content: SetStateAction<string>) {
    setDescriptions(content);
  }
  const handleAvatarChange = (event: any) => {
    let listImages: any = []
    for (let i = 0; i < event.target.files.length; i++) {
      listImages.push(event.target.files[i])
    }
    setImages(listImages)
  };
  useEffect(() => {
    if (price < 10000000000 || price > 0) {
      setErrorPrice("")
    }
    if (price > 10000000000 || price < 0) {
      setErrorPrice("Value is too large or too small")
    }
    if (quantity < 10000000000 || quantity > 0) {
      setErrorQuantity("")
    }
    if (quantity > 10000000000 || quantity < 0) {
      setErrorQuantity("Value is too large or too small")
    }
  }, [price, quantity])
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (productEdit && type == "Edit") {
      const updateProductt = {
        name: name,
        quantity: quantity,
        price: price,
        category: selected,
        description: descriptions,
        stock: quantity,
      };
      console.log("updateProductt", updateProductt);
      try {
        const updateProduct = await BaseAxios.put(`/products/update/${productEdit?.id}`, updateProductt)
        console.log("updated product", updateProduct);
        if (updateProduct.status === 200) {
          setName("");
          setQuantity(0);
          setDescriptions("");
          setPrice(0);
          // navigate(-1); // Quay lại trang trước đó
        }

      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      }
    } else if (
      selected &&
      descriptions &&
      name &&
      price &&
      descriptions !== ""
    ) {
      const newProduct = {
        name: name,
        price: price,
        description: descriptions,
        categoryId: selected,
        stock: quantity,
      };
      const createProduct = await BaseAxios.post(`/products`, newProduct)
      if (createProduct?.data?.status == 200) {
        const formData = new FormData();
        // Lặp qua mảng hình ảnh và thêm từng hình ảnh vào FormData 
        images.forEach((img: any) => {
          formData.append(`file`, img); // Tên trường sẽ là `images[0]`, `images[1]`,...
        });
        formData.append("productId", createProduct?.data?.product?.id); // imageFile là File hoặc Blob của hình ảnh
        await BaseAxios.post("/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      }
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
    } else {
      alert("Please enter form");
    }
  }
  const handleEdit = async (id: number) => {
    let formData = new FormData();
    if (image1) {
      formData.append(`file`, image1);
      await BaseAxios.put(`/images/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    }
    else if (image2) {
      formData.append(`file`, image2);
      await BaseAxios.put(`/images/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    }
    else {
      formData.append(`file`, image3);
      await BaseAxios.put(`/images/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    }

    alert("updated successfully")
  }

  return (
    <div className="container">
      <div
        style={{
          padding: "13px 20px 13px 20px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          fontWeight: "bolder",
          fontSize: "14px",
          borderLeft: "6px solid  #ffd43b",
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <p>Thêm sản phẩm</p>
        <p>{formattedDate} </p>
      </div>
      <section
        style={{
          width: "95%",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "20px 6px 20px 6px",
        }}
      >
        <p
          style={{
            margin: "0 15px 15px 15px",
            fontWeight: "bolder",
            borderBottom: "3px solid #ffd43b",
            paddingBottom: "14px",
          }}
        >
          Tạo mới sản phẩm
        </p>

        <form encType="multipart/form-data" style={{ padding: "0 15px 15px 15px" }}>

          <div className="input-item">
            <label htmlFor="name">Tên sản phẩm</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="quantity">Số lượng </label>
            <input
              onChange={(e) => setQuantity(e.target.value)
              }
              value={quantity}
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
            />
            <p style={{ color: "red" }}>{errorQuantity}</p>
          </div>
          <div className="input-item">
            <label htmlFor="price">Giá sản phẩm </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="price"
              name="price"
              type="number"
              min="1"
              required
            />
            <p style={{ color: "red" }}>{errorPrice}</p>
          </div>
          <div className="input-item">
            <label htmlFor="type">Danh mục</label>
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              name="images"
              id="type"
              required>
              <option value="">-- Loại --</option>
              <option value="1">Candle</option>
              <option value="2">Room mist</option>
              <option value="3">Room perfume</option>
              <option value="4">Bath bar</option>
              <option value="5">Gift Sets</option>
            </select>
          </div>
          <div style={{ display: type == "Edit" ? "block" : "none" }}>
            <div className="input-edit-item ">
              <label>Ảnh sản phẩm 1:</label>
              <img className="img-edit-product" src={productEdit?.image?.[0]?.imgSrc} alt="" />
              <input
                type="file"
                onChange={(e: any) => setImage1(e.target.files?.[0])} />
              {image1 != null ? <button onClick={() => handleEdit(productEdit?.image?.[0]?.id)}>Update</button> : ""}
            </div>
            <div style={{ display: type == "Edit" ? "block" : "none" }} className="input-edit-item ">
              <label>Ảnh sản phẩm 2:</label>
              <img className="img-edit-product" src={productEdit?.image?.[1]?.imgSrc} alt="" />
              <input
                type="file"
                onChange={(e: any) => setImage2(e.target.files?.[0])} />
              {image2 != null ? <button onClick={() => handleEdit(productEdit?.image?.[1]?.id)}>Update</button> : ""}
            </div>
            <div style={{ display: type == "Edit" ? "block" : "none" }} className="input-edit-item">
              <label>Ảnh sản phẩm 3:</label>
              <img className="img-edit-product" src={productEdit?.image?.[2]?.imgSrc} alt="" />
              <input
                type="file"
                onChange={(e: any) => setImage3(e.target.files?.[0])} />
              {image3 != null ? <button onClick={() => handleEdit(productEdit?.image?.[2]?.id)}>Update</button> : ""}
            </div>
          </div>
          <div style={{ display: type == "Edit" ? "none" : "block" }} className="input-item">
            <label>Ảnh sản phẩm:</label>
            <input
              style={{ height: "100%", display: type == "Edit" ? "none" : "block" }}
              type="file"
              multiple
              onChange={(handleAvatarChange)}
              required />
          </div>
          <div style={{ marginBottom: "20px" }} className="input-item">
            <label htmlFor="">Mô tả sản phẩm</label>
            <TinyMCEEditor
              value={descriptions}
              onChange={handleDescriptionChange}
            />
          </div>
          <input
            style={{
              width: "80px",
              height: "35px",
              border: "none",
              color: "#fff",
              backgroundColor: "#333",
              display: "block",
              margin: "0 auto",
              letterSpacing: "1px",
              borderRadius: "5px",
            }}
            type="submit"
            value="Submit"
            name={productEdit ? "Edit" : "Create"}
            onClick={handleSubmit}
          />
        </form>
      </section>
    </div>
  );
}
