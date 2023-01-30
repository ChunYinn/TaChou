import {useContext, useState} from "react";
import { Box, Button, FormControl, TextField, InputLabel, MenuItem, Select } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { doc, setDoc  } from "firebase/firestore"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { getDownloadURL, ref ,uploadBytesResumable} from "firebase/storage";
import { v4 } from "uuid";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {currentUser} = useContext(AuthContext);

  //img url set
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();

  // --------------------------業務填寫--------------------------------
  //Return Date
  const [return_date_value, set_return_date_Value] = useState(null);

  //Order Date
  const [order_date_value, set_order_date_Value] = useState(null);

  //Expect Delivery Date
  const [expect_delivery_date_value, set_expect_delivery_date_Value] = useState(null);

  //Select
  const [item, setItem] = useState('');

  const handleSelectChange = (event) => {
    setItem(event.target.value);
  };
  //------------------------------------------------------------------------------

  //create date for id
  const today_str = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
  const today = new Date(today_str).toISOString().substring(0, 19).replace(/[T-]|:/g,'');

  //handle submit event
  const handleFormSubmit = async(values, {resetForm}) => {
    //for imageupload

    if (!file) {
      console.log("image file null");
      try {
        await setDoc(doc(db, "Reworks", today), {
          values,
          timeStamp: today,
          author: currentUser.email.split('@')[0],
          imgURL: ""
        });
        console.log("finised submit");
        // resetForm({values:""});
        // setItem('')
        // set_expect_delivery_date_Value(null)
        // set_order_date_Value(null)
        // set_return_date_Value(null)
        alert("提交成功!")
      } catch (error) {
        console.log(error);
      }
    } else {
      const storageRef = ref(storage, `${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          }, 
          (error) => {
            console.log(error);
          }, 
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              // setFileURLStore(downloadURL);
              try {
                setDoc(doc(db, "Reworks", today), {
                  values,
                  timeStamp: today,
                  author: currentUser.email.split('@')[0],
                  imgURL: downloadURL
                })
                console.log("finised submit");
                // resetForm({values:""});
                // setItem('')
                // set_expect_delivery_date_Value(null)
                // set_order_date_Value(null)
                // set_return_date_Value(null)
                // setFile(null)
                // setFileURL(null)
                alert("提交成功!")
              } catch (error) {
                console.log(error);
              }
            })
            
          }
        )
    }

  };


  return (
    <Box m="20px">
      <Header title="新增重工" subtitle="業務填寫" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}   >
            {/* --------------------------業務填寫-------------------------------- */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormControl variant="filled">
                <InputLabel id="category_name">重工類型</InputLabel>
                <Select
                  label="重工類型"
                  labelId="category_name"
                  value={item}
                  onChange={(item) => {
                    handleSelectChange(item);
                    values.category_name = item.target.value
                  }}
                >
                  <MenuItem value={'場內重工'}>場內重工</MenuItem>
                  <MenuItem value={'客戶退貨'}>客戶退貨</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="退貨編號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.return_id}
                name="return_id"
                error={!!touched.return_id && !!errors.return_id}
                helperText={touched.return_id && errors.return_id}
                sx={{ gridColumn: "span 1" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  variant="filled"
                  label="退貨日期"
                  inputFormat="YYYY/MM/DD"
                  value={return_date_value}
                  name="return_date"
                  onChange={(newValue) => {
                    set_return_date_Value(newValue);
                    values.return_date = newValue.$d.toDateString()
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  error={!!touched.return_date && !!errors.return_date}
                  helperText={touched.return_date && errors.return_date}
                  sx={{ gridColumn: "span 1" }}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="退貨原因"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.return_reason}
                name="return_reason"
                error={!!touched.return_reason && !!errors.return_reason}
                helperText={touched.return_reason && errors.return_reason}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="排程單號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_id}
                name="order_id"
                error={!!touched.order_id && !!errors.order_id}
                helperText={touched.order_id && errors.order_id}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="訂單類別"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_type}
                name="order_type"
                error={!!touched.order_type && !!errors.order_type}
                helperText={touched.order_type && errors.order_type}
                sx={{ gridColumn: "span 1" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  inputVariant="filled"
                  label="訂單日期"
                  inputFormat="YYYY/MM/DD"
                  value={order_date_value}
                  name="order_date"
                  onChange={(newValue) => {
                    set_order_date_Value(newValue);
                    values.order_date = newValue.$d.toDateString()
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  error={!!touched.order_date && !!errors.order_date}
                  helperText={touched.order_date && errors.order_date}
                  sx={{ gridColumn: "span 1" }}
                />
                <DatePicker
                  fullWidth
                  variant="filled"
                  label="預計交貨日"
                  inputFormat="YYYY/MM/DD"
                  value={expect_delivery_date_value}
                  name="expect_delivery_date"
                  onChange={(newValue) => {
                    set_expect_delivery_date_Value(newValue);
                    values.expect_delivery_date = newValue.$d.toDateString()
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  error={!!touched.expect_delivery_date && !!errors.expect_delivery_date}
                helperText={touched.expect_delivery_date && errors.expect_delivery_date}
                sx={{ gridColumn: "span 1" }}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="重工支數"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rework_quantity}
                name="rework_quantity"
                error={!!touched.rework_quantity && !!errors.rework_quantity}
                helperText={touched.rework_quantity && errors.rework_quantity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="客戶編號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customer_id}
                name="customer_id"
                error={!!touched.customer_id && !!errors.customer_id}
                helperText={touched.customer_id && errors.customer_id}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="客戶名稱"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customer_name}
                name="customer_name"
                error={!!touched.customer_name && !!errors.customer_name}
                helperText={touched.customer_name && errors.customer_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="產品編號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.product_id}
                name="product_id"
                error={!!touched.product_id && !!errors.product_id}
                helperText={touched.product_id && errors.product_id}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="產品名稱"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.product_name}
                name="product_name"
                error={!!touched.product_name && !!errors.product_name}
                helperText={touched.product_name && errors.product_name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="產品規格"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.product_specification}
                name="product_specification"
                error={!!touched.product_specification && !!errors.product_specification}
                helperText={touched.product_specification && errors.product_specification}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="產品顏色"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.product_color}
                name="product_color"
                error={!!touched.product_color && !!errors.product_color}
                helperText={touched.product_color && errors.product_color}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="鐵輪編號"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.iron_id}
                name="iron_id"
                error={!!touched.iron_id && !!errors.iron_id}
                helperText={touched.iron_id && errors.iron_id}
                sx={{ gridColumn: "span 1" }}
              />
            {/* //-Submit----------------------------------------------------- */}
              <Button variant="contained" component="label" sx={{fontSize: 16, mr:"4px", boxShadow:3}} color="secondary" startIcon={<DriveFolderUploadIcon />}>
                  上傳圖片
                  <input hidden accept="image/*" multiple type="file" onChange={e=>{
                    setFile(e.target.files[0]);
                    setFileURL(URL.createObjectURL(e.target.files[0]));
                  }} />
              </Button>
              <Box>
                <IconButton aria-label="delete" onClick={e=>{
                  setFile(null)
                  setFileURL(null)
                  }}>
                  <DeleteIcon sx={{display:'flex', alignItems:'end', height:'20px'}}/>
                  {/* <Typography sx={{fontSize: 14, ml:"7px"}}>刪除照片</Typography>   */}
                </IconButton>
              </Box>

            </Box>
            
            <br/>
            <Box display="flex" justifyContent="center" width={"70%"} 
              sx={{mt:"40px", border: '3px solid', display:'flex', ml:'auto', mr:'auto', padding:'10px', 
                borderRadius:'10px', boxShadow:4, color:'grey.500'}}>
              <img src={file===null || file ===undefined ? 'https://www.topperstutors.com/img/upload.png':fileURL} alt="上傳圖片" width={"150vh"} style={{backgroundColor:(file===null || file ===undefined)&&"white", borderRadius:(file===null || file ===undefined)&&"50%"}} />             
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px" mb="10px">
              <Button type="submit" color="secondary" variant="contained"
                sx={{ width: 100, height: 50, fontSize: 16}}>
                提交
              </Button>
            </Box>

          </form>
        )}
      </Formik>
    </Box>
  )
};

const checkoutSchema = yup.object().shape({
  category_name: yup.string().required("required"),
  order_id: yup.string().required("required"),
  expect_delivery_date: yup.string().required("required"),
  rework_quantity: yup.string().required("required"),
});
const initialValues = {
  //--------------------------業務填寫--------------------------------
  category_name: "",
  return_id: "",
  return_date: "",
  return_reason: "",
  order_id: "",
  order_type: "",
  order_date: "",
  expect_delivery_date: "",
  rework_quantity: "",
  customer_id: "",
  customer_name: "",
  product_id: "",
  product_name: "",
  product_specification: "",
  product_color: "",
  iron_id: "",
  // --------------------------品管填寫--------------------------------
  rework_factor_description: "",
  factor_id: "",
  factor_name: "",
  department_id: "",
  department_name: "",
  improve_id: "",
  solve_method: "",
  avoid_method: "",
  rework_complete_date: "",

  // --------------------------原料部主管填寫--------------------------------
  raw_material_form_column_1: "",
  raw_material_form_column_2: "",
  raw_material_form_column_3: "",
  raw_material_form_column_4: "",
  raw_material_form_column_5: "",
  raw_material_form_column_6: "",
  raw_material_form_column_7: "",
  raw_material_form_column_8: "",
  raw_material_form_column_9: "",

  // --------------------------包膠部主管填寫-包膠-------------------------------
  lagging_form_column_1: "",
  lagging_form_column_2: "",
  lagging_form_column_3: "",
  lagging_form_column_4: "",
  lagging_form_column_5: "",
  lagging_form_column_6: "",
  lagging_form_column_7: "",
  lagging_form_column_8: "",
  lagging_form_column_9: "",
  lagging_form_column_10: "",
  lagging_form_column_11: "",
  lagging_form_column_12: "",
  lagging_form_column_13: "",
  lagging_form_column_14: "",
  lagging_form_column_15: "",
  lagging_form_column_16: "",
  lagging_form_column_17: "",
  lagging_form_column_18: "",

  // --------------------------包膠部主管填寫-擠料-------------------------------

  extrusion_form_column_1	: "",
  extrusion_form_column_2	: "",
  extrusion_form_column_3	: "",
  extrusion_form_column_4	: "",
  extrusion_form_column_5	: "",
  extrusion_form_column_6	: "",
  extrusion_form_column_7	: "",
  extrusion_form_column_8	: "",
  extrusion_form_column_9	: "",
  extrusion_form_column_10	: "",
  extrusion_form_column_11	: "",
  extrusion_form_column_12	: "",
  extrusion_form_column_13	: "",
  extrusion_form_column_14	: "",
  extrusion_form_column_15	: "",
  extrusion_form_column_16	: "",
  extrusion_form_column_17	: "",
  extrusion_form_column_18	: "",
  extrusion_form_column_19	: "",
  extrusion_form_column_20	: "",
  extrusion_form_column_21	: "",
  extrusion_form_column_22	: "",
  extrusion_form_column_23	: "",
  extrusion_form_column_24	: "",
  extrusion_form_column_25	: "",
  extrusion_form_column_26	: "",
  extrusion_form_column_27	: "",
  extrusion_form_column_28	: "",
  extrusion_form_column_29	: "",
  extrusion_form_column_30	: "",
  extrusion_form_column_31	: "",
  extrusion_form_column_32	: "",
  extrusion_form_column_33	: "",
  extrusion_form_column_34	: "",
  extrusion_form_column_35	: "",
  extrusion_form_column_36	: "",
  extrusion_form_column_37	: "",
  extrusion_form_column_38	: "",
  extrusion_form_column_39	: "",
  extrusion_form_column_40	: "",
  extrusion_form_column_41	: "",
  extrusion_form_column_42	: "",

  // --------------------------車床部主管填寫--------------------------------

  lathe_form_column_1	: "",
  lathe_form_column_2	: "",
  lathe_form_column_3	: "",
  lathe_form_column_4	: "",
  lathe_form_column_5	: "",
  lathe_form_column_6	: "",
  lathe_form_column_7	: "",
  lathe_form_column_8	: "",
  lathe_form_column_9	: "",
  lathe_form_column_10	: "",
  lathe_form_column_11	: "",
  lathe_form_column_12	: "",
  lathe_form_column_13	: "",
};

export default Form;
