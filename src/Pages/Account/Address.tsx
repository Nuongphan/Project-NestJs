import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
import BaseAxios from "../../api/axiosClient";
const Address = () => {
  const [loading, setLoading] = useState(true);
  const [userr, setUserr] = useState<any>();
  const [codeProvince, setCodeProvince] = useState<any>();
  const [codeDistrict, setCodeDistrict] = useState<any>();
  const [codeWard, setCodeWard] = useState<any>();
  const [province, setProvince] = useState<any[]>();
  const [district, setDistrict] = useState<any[]>();
  const [nameProvince, setNameProvince] = useState<any>()
  const [nameDistric, setNameDistrict] = useState<any>()
  const [nameWard, setNameWard] = useState<string>("")
  const [ward, setWard] = useState<any[]>();
  const [idAddress, setIdAddress] = useState<any>();
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    BaseAxios.get(`http://localhost:8000/users/${userLogin?.id}/address`)
      .then((res) => {
      
        setUserr(res.data)
      })
      .catch((err) => { console.log(err) }),
      axios.get("https://vapi.vnappmob.com/api/province")
        .then((res) => {
          setProvince(res.data.results);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(true)
        })
  }, [])
 
  const addressUser = userr?.address?.[0]
  
  useEffect(() => { 
    if (addressUser) {
      setAddress(addressUser?.address);
      setPhone(addressUser?.phone);
      setIdAddress(addressUser?.id)
      setName(addressUser?.name)
      setNameProvince(addressUser?.province)
      setNameDistrict(addressUser?.district)
      setNameWard(addressUser?.ward)
    }
  }, [addressUser]);
  useEffect(() => {
    const getDistrict = () => {
      if (codeProvince) {
        try {
          axios.get(`https://vapi.vnappmob.com/api/province/district/${codeProvince}`)
            .then((res) => {
              setDistrict(res.data.results);
              setLoading(false)
            })
        }
        catch (err) {
          console.log(err);
          setLoading(true)
        }
      }
    }
    getDistrict()
    const getWard = () => {
      if (codeDistrict) {
        try {
          axios.get(`https://vapi.vnappmob.com/api/province/ward/${codeDistrict}`)
            .then((res) => {
              setWard(res.data.results);
              setLoading(false)
            })
        }
        catch (err) {
          console.log(err);
          setLoading(true)
        }
      }
    }
    getWard()
  }, [codeDistrict, codeProvince, isCreate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (addressUser) {      
      await BaseAxios.put(`http://localhost:8000/users/${userLogin?.id}/address/${idAddress}`,
        { phone: phone, address: address, province: nameProvince, district: nameDistric, ward: nameWard, idUser: userLogin?.id, idAddress: idAddress, name: name, })
        .then((res) => { alert("Updated Address")})
        .catch((err) => console.log(err))
    } else  {
      await BaseAxios.post(`http://localhost:8000/users/${userLogin?.id}/address`, { phone: phone, address: address, province: nameProvince, district: nameDistric, ward: nameWard, name: name, })
        .then((res) => {console.log(res)})
        .catch((err) =>{console.log(err)})
        alert("Created successfully")
        setIsCreate(true)
    }
   
  }
  return (
    <div className={styles.inforContainerSubmited}>
      <h4>ADDRESS</h4>
      <form action="" className="formAddress">
        <div className={styles.inputGroupAddress}>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={styles.addressSubmited}
          />
          <label>Address:</label>
          {loading == false &&
            <select
              value={codeProvince}
              onChange={(e) => {
                setNameProvince(e.target.options[e.target.selectedIndex].text);
                setCodeProvince(Number(e.target.value))
              }}
              name="province" id="province">
              <option value="">Tỉnh</option>
              {province?.map((item: any) => (
                <option key={item?.province_id} value={item?.province_id}>
                  {item?.province_name}
                </option>
              ))}
            </select>}
          {loading == false &&
            <select
              value={codeDistrict}
              onChange={(e) => {
                setNameDistrict(e.target.options[e.target.selectedIndex].text);
                setCodeDistrict(Number(e.target.value))
              }}
              name="district" id="district">
              <option value="">Huyện, Quận</option>
              {district?.map((item: any) => (
                <option key={item?.district_id} value={item?.district_id}>
                  {item?.district_name}
                </option>
              ))}
            </select>}
          {loading == false &&
            <select
           
              value={codeWard}
              onChange={(e) => {
                setNameWard(e.target.options[e.target.selectedIndex].text);
                setCodeWard(Number(e.target.value))
              }}
              name="ward" id="ward">
              <option value="">Phường, Xã</option>
              {ward?.map((item: any) => (
                <option  key={item?.ward_id} value={item?.ward_id}>
                  {item?.ward_name}
                </option>
              ))}
            </select>}

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className={styles.addressSubmited}
          />
          <label>Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className={styles.phoneSubmited}
          />
          <input onClick={handleSubmit} type="submit" value={addressUser ? "EDIT" : "CREATE"} />
        </div>
      </form>
    </div>
  );
};

export default Address;
