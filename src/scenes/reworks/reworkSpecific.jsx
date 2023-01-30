import * as React from 'react';
import { Box,useTheme, Button, FormControl, TextField, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from '@mui/material/Link';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from "../../components/Header";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { tokens } from '../../theme';

let dataList = []

export default function ReworkDetail({id}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [dataCollection, setDataCollection] = useState([]);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    useEffect(()=>{
        (async()=>{
          dataList = []
          try {
            const q = query(collection(db, "Reworks"), where("timeStamp", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                dataList.push({id:doc.id, ...doc.data()});
            });
          } catch (error) {
            console.log(error);
          }
          setDataCollection(dataList);
          // set old values to initiavalues
          initialValues={...dataList[0].values}
        
        })();  
    },[]);

    // console.log(initialValues);

    const columns = [
        { field: "id", headerName: "重工編號",flex:1, render:rowData=> <Link href="/">{rowData.id}</Link>},
        { field: "order_id", headerName: "排程單號",flex:1 },
        { field: "order_date", headerName: "訂單日期",flex:1 },
        { field: "return_date", headerName: "退貨日期",flex:1 },
        { field: "order_type", headerName: "訂單類別",flex:1 },
        {
        field: "customer_name",
        headerName: "客戶",
        flex: 1,
        cellClassName: "name-column--cell",
        },
        {
        field: "rework_quantity",
        headerName: "數量",
        type: "number",
        headerAlign: "left",
        align: "left",
        },
        {
        field: "product_name",
        headerName: '產品名稱',
        flex: 1,
        },
        {
        field: "product_specification",
        headerName: "產品規格",
        flex: 1,
        },
        {
        field: "return_reason",
        headerName: "退貨原因",
        flex: 1,
        },
    ];
    
    // Rework inputs are below
    const handleFormSubmit = async(values) => {
      const userDoc = doc(db, 'Reworks', id);
      await updateDoc(userDoc, {
        values: values
      });
      alert("提交成功!")
      // console.log(values);
    };
    // --------------------------業務填寫--------------------------------
    //Return Date
    const [return_date_value, set_return_date_Value] = React.useState(null);
  
    //Order Date
    const [order_date_value, set_order_date_Value] = React.useState(null);
  
    //Expect Delivery Date
    const [expect_delivery_date_value, set_expect_delivery_date_Value] = React.useState(null);
  
    //Select
    const [item, setItem] = React.useState('');
  
    const handleSelectChange = (event) => {
      setItem(event.target.value);
    };
  
    //--------------------------品管填寫--------------------------------
    //Rework Complete Date
    const [rework_complete_date_value, set_rework_complete_date_value] = React.useState(null);
  
    //-------------------------原料主管填寫--------------------------------
    //Raw Material Form Column 3 Date & Time
    const [raw_material_form_column_3_value, set_raw_material_form_column_3_value] = React.useState(null);
  
    //Raw Material Form Column 4 Date & Time
    const [raw_material_form_column_4_value, set_raw_material_form_column_4_value] = React.useState(null);
  
    //Raw Material Form Column 6 Date & Time
    const [raw_material_form_column_6_value, set_raw_material_form_column_6_value] = React.useState(null);
  
    //Raw Material Form Column 7 Date & Time
    const [raw_material_form_column_7_value, set_raw_material_form_column_7_value] = React.useState(null);
  
    //-------------------------包膠主管填寫--------------------------------
  
    //Lagging Form Column 1 Date
    const [lagging_form_column_1_value, set_lagging_form_column_1_value] = React.useState(null);
  
    //Lagging Form Column 3 Date
    const [lagging_form_column_3_value, set_lagging_form_column_3_value] = React.useState(null);
  
    //Extrusion Form Column 1 Date
    const [extrusion_form_column_1_value, set_extrusion_form_column_1_value] = React.useState(null);
    
    //Extrusion Form Column 3 Date
    const [extrusion_form_column_3_value, set_extrusion_form_column_3_value] = React.useState(null);
  
    //-------------------------車床主管填寫--------------------------------
  
    //Lathe Form Column 1 Date
    const [lathe_form_column_1_value, set_lathe_form_column_1_value] = React.useState(null);
  
    //Lathe Form Column 6 Date
    const [lathe_form_column_6_value, set_lathe_form_column_6_value] = React.useState(null);
  
    //Lathe Form Column 11 Date
    const [lathe_form_column_11_value, set_lathe_form_column_11_value] = React.useState(null);
    //-------------------- buttom usestate for forms ---------
    const [pinQuan, setpinQuan] = React.useState(false);
    const [yuanLiao, setyuanLiao] = React.useState(false);
    const [baoJiao, setbaoJiao] = React.useState(false);
    const [jiLiao, setjiLiao] = React.useState(false);
    const [carBed, setcarBed] = React.useState(false);

    //----------------------------------------------------

  return (
    <Box m="20px">
      <Header title={`重工案件: ${id}`} mb="0"/> 
      <Box sx={{ '& button': { m: 1 } }} display="flex" justifyContent="center">
        <Button size="medium" sx={{bgcolor:colors.blueAccent[700], fontSize:"14px"}} variant="contained" onClick={()=>{
          setpinQuan(true); setyuanLiao(false); setbaoJiao(false); setjiLiao(false); setcarBed(false);
        }}>品管</Button>
        <Button size="medium" variant="contained" sx={{bgcolor:colors.blueAccent[700], fontSize:"14px"}} onClick={()=>{
          setpinQuan(false); setyuanLiao(true); setbaoJiao(false); setjiLiao(false); setcarBed(false);
        }}>原料</Button>
        <Button size="medium" variant="contained" sx={{bgcolor:colors.blueAccent[700], fontSize:"14px"}} onClick={()=>{
          setpinQuan(false); setyuanLiao(false); setbaoJiao(true); setjiLiao(false); setcarBed(false);
        }}>包膠</Button>
        <Button size="medium" variant="contained" sx={{bgcolor:colors.blueAccent[700], fontSize:"14px"}} onClick={()=>{
          setpinQuan(false); setyuanLiao(false); setbaoJiao(false); setjiLiao(true); setcarBed(false);
        }}>擠料</Button>
        <Button size="medium" variant="contained" sx={{bgcolor:colors.blueAccent[700], fontSize:"14px"}} onClick={()=>{
          setpinQuan(false); setyuanLiao(false); setbaoJiao(false); setjiLiao(false); setcarBed(true);
        }}>車床</Button>
      </Box>
      
      <Box>
      <Header subtitle="業務填寫" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
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
          <form onSubmit={handleSubmit}>

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
                  value={item||values.category_name}
                  onChange={(item) => {
                    handleSelectChange(item);
                    values.category_name = item.target.value
                    console.log(values.category_name);
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
                  value={return_date_value||values.return_date}
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
                  value={order_date_value||values.order_date}
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
                  value={expect_delivery_date_value||values.expect_delivery_date}
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
                type="number"
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
                name="product_id"
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
                name="product_id"
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
            </Box>
            {/* --------------------------品管填寫-------------------------------- */}
            {pinQuan && (
              <Box>
                <br/>
                <hr/>
                <br/>
                <Header title="品管表單" subtitle="品管填寫" />
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="重工原因描述"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.rework_factor_description}
                      name="rework_factor_description"
                      error={!!touched.rework_factor_description && !!errors.rework_factor_description}
                      helperText={touched.rework_factor_description && errors.rework_factor_description}
                      sx={{ gridColumn: "span 4" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原因編號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.factor_id}
                      name="factor_id"
                      error={!!touched.factor_id && !!errors.factor_id}
                      helperText={touched.factor_id && errors.factor_id}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原因名稱"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.factor_name}
                      name="factor_name"
                      error={!!touched.factor_name && !!errors.factor_name}
                      helperText={touched.factor_name && errors.factor_name}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="責任部門編號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.department_id}
                      name="department_id"
                      error={!!touched.department_id && !!errors.department_id}
                      helperText={touched.department_id && errors.department_id}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="責任部門名稱"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.department_name}
                      name="department_name"
                      error={!!touched.department_name && !!errors.department_name}
                      helperText={touched.department_name && errors.department_name}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="改善編號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.improve_id}
                      name="improve_id"
                      error={!!touched.improve_id && !!errors.improve_id}
                      helperText={touched.improve_id && errors.improve_id}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="矯正方法"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.solve_method}
                      name="solve_method"
                      error={!!touched.solve_method && !!errors.solve_method}
                      helperText={touched.solve_method && errors.solve_method}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="預防方法"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.avoid_method}
                      name="avoid_method"
                      error={!!touched.avoid_method && !!errors.avoid_method}
                      helperText={touched.avoid_method && errors.avoid_method}
                      sx={{ gridColumn: "span 2" }}
                    />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="完成出貨日期"
                      inputFormat="YYYY/MM/DD"
                      value={rework_complete_date_value||values.rework_complete_date}
                      name="rework_complete_date"
                      onChange={(newValue) => {
                        set_rework_complete_date_value(newValue);
                        values.rework_complete_date = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.rework_complete_date && !!errors.rework_complete_date}
                      helperText={touched.rework_complete_date && errors.rework_complete_date}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

            )};

            {/* --------------------------原料部主管填寫-------------------------------- */}
            {yuanLiao && (
              <Box>
                <br></br>
                <hr></hr>
                <br></br>
                <Header title="原料表單" subtitle="原料部主管填寫" />
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="打料批號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.raw_material_form_column_1}
                      name="raw_material_form_column_1"
                      error={!!touched.raw_material_form_column_1 && !!errors.raw_material_form_column_1}
                      helperText={touched.raw_material_form_column_1 && errors.raw_material_form_column_1}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="硬度"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.raw_material_form_column_2}
                      name="raw_material_form_column_2"
                      error={!!touched.raw_material_form_column_2 && !!errors.raw_material_form_column_2}
                      helperText={touched.raw_material_form_column_2 && errors.raw_material_form_column_2}
                      sx={{ gridColumn: "span 1" }}
                    />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      fullWidth
                      variant="filled"
                      label="打料一次 開始時間日期"
                      inputFormat="YYYY/MM/DD HH:mm"
                      value={raw_material_form_column_3_value||values.raw_material_form_column_3}
                      name="raw_material_form_column_3"
                      onChange={(newValue) => {
                        set_raw_material_form_column_3_value(newValue);
                        values.raw_material_form_column_3 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.raw_material_form_column_3 && !!errors.raw_material_form_column_3}
                      helperText={touched.raw_material_form_column_3 && errors.raw_material_form_column_3}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <DateTimePicker
                      fullWidth
                      variant="filled"
                      label="打料一次 結束時間日期"
                      inputFormat="YYYY/MM/DD HH:mm"
                      value={raw_material_form_column_4_value||values.raw_material_form_column_4}
                      name="raw_material_form_column_4"
                      onChange={(newValue) => {
                        set_raw_material_form_column_4_value(newValue);
                        values.raw_material_form_column_4 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.raw_material_form_column_4 && !!errors.raw_material_form_column_4}
                      helperText={touched.raw_material_form_column_4 && errors.raw_material_form_column_4}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="一次重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.raw_material_form_column_5}
                      name="raw_material_form_column_5"
                      error={!!touched.raw_material_form_column_5 && !!errors.raw_material_form_column_5}
                      helperText={touched.raw_material_form_column_5 && errors.raw_material_form_column_5}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      fullWidth
                      variant="filled"
                      label="打料二次 開始時間日期"
                      inputFormat="YYYY/MM/DD HH:mm"
                      value={raw_material_form_column_6_value||values.raw_material_form_column_6}
                      name="raw_material_form_column_6"
                      onChange={(newValue) => {
                        set_raw_material_form_column_6_value(newValue);
                        values.raw_material_form_column_6 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.raw_material_form_column_6 && !!errors.raw_material_form_column_6}
                      helperText={touched.raw_material_form_column_6 && errors.raw_material_form_column_6}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <DateTimePicker
                      fullWidth
                      variant="filled"
                      label="打料二次 結束時間日期"
                      inputFormat="YYYY/MM/DD HH:mm"
                      value={raw_material_form_column_7_value||values.raw_material_form_column_7}
                      name="raw_material_form_column_7"
                      onChange={(newValue) => {
                        set_raw_material_form_column_7_value(newValue);
                        values.raw_material_form_column_7 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.raw_material_form_column_7 && !!errors.raw_material_form_column_7}
                      helperText={touched.raw_material_form_column_7 && errors.raw_material_form_column_7}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="二次重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.raw_material_form_column_8}
                      name="raw_material_form_column_8"
                      error={!!touched.raw_material_form_column_8 && !!errors.raw_material_form_column_8}
                      helperText={touched.raw_material_form_column_8 && errors.raw_material_form_column_8}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="過濾濾網"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.raw_material_form_column_9}
                      name="raw_material_form_column_9"
                      error={!!touched.raw_material_form_column_9 && !!errors.raw_material_form_column_9}
                      helperText={touched.raw_material_form_column_9 && errors.raw_material_form_column_9}
                      sx={{ gridColumn: "span 1" }}
                    />
                </Box>
              </Box>
            )}
              
            {/* --------------------------包膠部主管填寫-包膠------------------------------- */}
            
            {baoJiao && (
              <Box>
                <br></br>
                <hr></hr>
                <br></br>
                <Header title="包膠表單" subtitle="包膠部主管填寫" />
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="包膠重工日期"
                      inputFormat="YYYY/MM/DD"
                      value={lagging_form_column_1_value||values.lagging_form_column_1}
                      name="lagging_form_column_1"
                      onChange={(newValue) => {
                        set_lagging_form_column_1_value(newValue);
                        values.lagging_form_column_1 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.lagging_form_column_1 && !!errors.lagging_form_column_1}
                      helperText={touched.lagging_form_column_1 && errors.lagging_form_column_1}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="擠料紀錄識別碼"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_2}
                      name="lagging_form_column_2"
                      error={!!touched.lagging_form_column_2 && !!errors.lagging_form_column_2}
                      helperText={touched.lagging_form_column_2 && errors.lagging_form_column_2}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="出片日期"
                      inputFormat="YYYY/MM/DD"
                      value={lagging_form_column_3_value||values.lagging_form_column_3}
                      name="lagging_form_column_3"
                      onChange={(newValue) => {
                        set_lagging_form_column_3_value(newValue);
                        values.lagging_form_column_3 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.lagging_form_column_3 && !!errors.lagging_form_column_3}
                      helperText={touched.lagging_form_column_3 && errors.lagging_form_column_3}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料編號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_4}
                      name="lagging_form_column_4"
                      error={!!touched.lagging_form_column_4 && !!errors.lagging_form_column_4}
                      helperText={touched.lagging_form_column_4 && errors.lagging_form_column_4}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號一"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_5}
                      name="lagging_form_column_5"
                      error={!!touched.lagging_form_column_5 && !!errors.lagging_form_column_5}
                      helperText={touched.lagging_form_column_5 && errors.lagging_form_column_5}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號一重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_6}
                      name="lagging_form_column_6"
                      error={!!touched.lagging_form_column_6 && !!errors.lagging_form_column_6}
                      helperText={touched.lagging_form_column_6 && errors.lagging_form_column_6}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號二"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_7}
                      name="lagging_form_column_7"
                      error={!!touched.lagging_form_column_7 && !!errors.lagging_form_column_7}
                      helperText={touched.lagging_form_column_7 && errors.lagging_form_column_7}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號二重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_8}
                      name="lagging_form_column_8"
                      error={!!touched.lagging_form_column_8 && !!errors.lagging_form_column_8}
                      helperText={touched.lagging_form_column_8 && errors.lagging_form_column_8}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="工件尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_9}
                      name="lagging_form_column_9"
                      error={!!touched.lagging_form_column_9 && !!errors.lagging_form_column_9}
                      helperText={touched.lagging_form_column_9 && errors.lagging_form_column_9}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="包膠尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_10}
                      name="lagging_form_column_10"
                      error={!!touched.lagging_form_column_10 && !!errors.lagging_form_column_10}
                      helperText={touched.lagging_form_column_10 && errors.lagging_form_column_10}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="厚度 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_11}
                      name="lagging_form_column_11"
                      error={!!touched.lagging_form_column_11 && !!errors.lagging_form_column_11}
                      helperText={touched.lagging_form_column_11 && errors.lagging_form_column_11}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="接著劑"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_12}
                      name="lagging_form_column_12"
                      error={!!touched.lagging_form_column_12 && !!errors.lagging_form_column_12}
                      helperText={touched.lagging_form_column_12 && errors.lagging_form_column_12}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="用料量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_13}
                      name="lagging_form_column_13"
                      error={!!touched.lagging_form_column_13 && !!errors.lagging_form_column_13}
                      helperText={touched.lagging_form_column_13 && errors.lagging_form_column_13}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="束布類型"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_14}
                      name="lagging_form_column_14"
                      error={!!touched.lagging_form_column_14 && !!errors.lagging_form_column_14}
                      helperText={touched.lagging_form_column_14 && errors.lagging_form_column_14}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="束布後尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_15}
                      name="lagging_form_column_15"
                      error={!!touched.lagging_form_column_15 && !!errors.lagging_form_column_15}
                      helperText={touched.lagging_form_column_15 && errors.lagging_form_column_15}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="取中"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_17}
                      name="lagging_form_column_17"
                      error={!!touched.lagging_form_column_17 && !!errors.lagging_form_column_17}
                      helperText={touched.lagging_form_column_17 && errors.lagging_form_column_17}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="包膠類型"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_18}
                      name="lagging_form_column_18"
                      error={!!touched.lagging_form_column_18 && !!errors.lagging_form_column_18}
                      helperText={touched.lagging_form_column_18 && errors.lagging_form_column_18}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="備註"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lagging_form_column_16}
                      name="lagging_form_column_16"
                      error={!!touched.lagging_form_column_16 && !!errors.lagging_form_column_16}
                      helperText={touched.lagging_form_column_16 && errors.lagging_form_column_16}
                      sx={{ gridColumn: "span 3" }}
                    />
                </Box>
              </Box>
            )};

            {/* --------------------------包膠部主管填寫-擠料------------------------------- */}
              
            {jiLiao && (
              <Box>
                <br></br>
                <hr></hr>
                <br></br>
                <Header title="擠料表單" subtitle="包膠部主管填寫" />
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="包膠重工日期"
                      inputFormat="YYYY/MM/DD"
                      value={extrusion_form_column_1_value||values.extrusion_form_column_1}
                      name="lagging_form_column_1"
                      onChange={(newValue) => {
                        set_extrusion_form_column_1_value(newValue);
                        values.extrusion_form_column_1 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.extrusion_form_column_1 && !!errors.extrusion_form_column_1}
                      helperText={touched.extrusion_form_column_1 && errors.extrusion_form_column_1}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="擠料紀錄識別碼"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_2}
                      name="extrusion_form_column_2"
                      error={!!touched.extrusion_form_column_2 && !!errors.extrusion_form_column_2}
                      helperText={touched.extrusion_form_column_2 && errors.extrusion_form_column_2}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="出片日期"
                      inputFormat="YYYY/MM/DD"
                      value={extrusion_form_column_3_value||values.extrusion_form_column_3}
                      name="extrusion_form_column_3"
                      onChange={(newValue) => {
                        set_extrusion_form_column_3_value(newValue);
                        values.extrusion_form_column_3 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.extrusion_form_column_3 && !!errors.extrusion_form_column_3}
                      helperText={touched.extrusion_form_column_3 && errors.extrusion_form_column_3}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料編號"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_4}
                      name="extrusion_form_column_4"
                      error={!!touched.extrusion_form_column_4 && !!errors.extrusion_form_column_4}
                      helperText={touched.extrusion_form_column_4 && errors.extrusion_form_column_4}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號一"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_5}
                      name="extrusion_form_column_5"
                      error={!!touched.extrusion_form_column_5 && !!errors.extrusion_form_column_5}
                      helperText={touched.extrusion_form_column_5 && errors.extrusion_form_column_5}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號一重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_6}
                      name="extrusion_form_column_6"
                      error={!!touched.extrusion_form_column_6 && !!errors.extrusion_form_column_6}
                      helperText={touched.extrusion_form_column_6 && errors.extrusion_form_column_6}
                      sx={{ gridColumn: "span 1" }}
                    />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號二"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_7}
                      name="extrusion_form_column_7"
                      error={!!touched.extrusion_form_column_7 && !!errors.extrusion_form_column_7}
                      helperText={touched.extrusion_form_column_7 && errors.extrusion_form_column_7}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="原料批號二重量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_8}
                      name="extrusion_form_column_8"
                      error={!!touched.extrusion_form_column_8 && !!errors.extrusion_form_column_8}
                      helperText={touched.extrusion_form_column_8 && errors.extrusion_form_column_8}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="工件尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_9}
                      name="extrusion_form_column_9"
                      error={!!touched.extrusion_form_column_9 && !!errors.extrusion_form_column_9}
                      helperText={touched.extrusion_form_column_9 && errors.extrusion_form_column_9}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="包膠尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_10}
                      name="extrusion_form_column_10"
                      error={!!touched.extrusion_form_column_10 && !!errors.extrusion_form_column_10}
                      helperText={touched.extrusion_form_column_10 && errors.extrusion_form_column_10}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="厚度 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_11}
                      name="extrusion_form_column_11"
                      error={!!touched.extrusion_form_column_11 && !!errors.extrusion_form_column_11}
                      helperText={touched.extrusion_form_column_11 && errors.extrusion_form_column_11}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="接著劑"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_12}
                      name="extrusion_form_column_12"
                      error={!!touched.extrusion_form_column_12 && !!errors.extrusion_form_column_12}
                      helperText={touched.extrusion_form_column_12 && errors.extrusion_form_column_12}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="用料量 (kg)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_13}
                      name="extrusion_form_column_13"
                      error={!!touched.extrusion_form_column_13 && !!errors.extrusion_form_column_13}
                      helperText={touched.extrusion_form_column_13 && errors.extrusion_form_column_13}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="束布類型"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_14}
                      name="extrusion_form_column_14"
                      error={!!touched.extrusion_form_column_14 && !!errors.extrusion_form_column_14}
                      helperText={touched.extrusion_form_column_14 && errors.extrusion_form_column_14}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="束布後尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_15}
                      name="extrusion_form_column_15"
                      error={!!touched.extrusion_form_column_15 && !!errors.extrusion_form_column_15}
                      helperText={touched.extrusion_form_column_15 && errors.extrusion_form_column_15}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="備註"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_16}
                      name="extrusion_form_column_16"
                      error={!!touched.extrusion_form_column_16 && !!errors.extrusion_form_column_16}
                      helperText={touched.extrusion_form_column_16 && errors.extrusion_form_column_16}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="取中"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_17}
                      name="extrusion_form_column_17"
                      error={!!touched.extrusion_form_column_17 && !!errors.extrusion_form_column_17}
                      helperText={touched.extrusion_form_column_17 && errors.extrusion_form_column_17}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="擠料包覆類型"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_18}
                      name="extrusion_form_column_18"
                      error={!!touched.extrusion_form_column_18 && !!errors.extrusion_form_column_18}
                      helperText={touched.extrusion_form_column_18 && errors.extrusion_form_column_18}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="模具(後套管/ mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_19}
                      name="extrusion_form_column_19"
                      error={!!touched.extrusion_form_column_19 && !!errors.extrusion_form_column_19}
                      helperText={touched.extrusion_form_column_19 && errors.extrusion_form_column_19}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="模具(內模/ mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_20}
                      name="extrusion_form_column_20"
                      error={!!touched.extrusion_form_column_20 && !!errors.extrusion_form_column_20}
                      helperText={touched.extrusion_form_column_20 && errors.extrusion_form_column_20}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="模具(內模 小/ mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_21}
                      name="extrusion_form_column_21"
                      error={!!touched.extrusion_form_column_21 && !!errors.extrusion_form_column_21}
                      helperText={touched.extrusion_form_column_21 && errors.extrusion_form_column_21}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="模具(外模/ mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_22}
                      name="extrusion_form_column_22"
                      error={!!touched.extrusion_form_column_22 && !!errors.extrusion_form_column_22}
                      helperText={touched.extrusion_form_column_22 && errors.extrusion_form_column_22}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="模具(外模 小/ mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_23}
                      name="extrusion_form_column_23"
                      error={!!touched.extrusion_form_column_23 && !!errors.extrusion_form_column_23}
                      helperText={touched.extrusion_form_column_23 && errors.extrusion_form_column_23}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="加長環"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_24}
                      name="extrusion_form_column_24"
                      error={!!touched.extrusion_form_column_24 && !!errors.extrusion_form_column_24}
                      helperText={touched.extrusion_form_column_24 && errors.extrusion_form_column_24}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="轉速(內軸)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_25}
                      name="extrusion_form_column_25"
                      error={!!touched.extrusion_form_column_25 && !!errors.extrusion_form_column_25}
                      helperText={touched.extrusion_form_column_25 && errors.extrusion_form_column_25}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="轉速(平台輸送)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_26}
                      name="extrusion_form_column_26"
                      error={!!touched.extrusion_form_column_26 && !!errors.extrusion_form_column_26}
                      helperText={touched.extrusion_form_column_26 && errors.extrusion_form_column_26}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="轉速(膠帶)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_27}
                      name="extrusion_form_column_27"
                      error={!!touched.extrusion_form_column_27 && !!errors.extrusion_form_column_27}
                      helperText={touched.extrusion_form_column_27 && errors.extrusion_form_column_27}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="轉速(壓出速度)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_28}
                      name="extrusion_form_column_28"
                      error={!!touched.extrusion_form_column_28 && !!errors.extrusion_form_column_28}
                      helperText={touched.extrusion_form_column_28 && errors.extrusion_form_column_28}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="溫度(內軸)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_29}
                      name="extrusion_form_column_29"
                      error={!!touched.extrusion_form_column_29 && !!errors.extrusion_form_column_29}
                      helperText={touched.extrusion_form_column_29 && errors.extrusion_form_column_29}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="溫度(機筒)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_30}
                      name="extrusion_form_column_30"
                      error={!!touched.extrusion_form_column_30 && !!errors.extrusion_form_column_30}
                      helperText={touched.extrusion_form_column_30 && errors.extrusion_form_column_30}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="溫度(壓出頭)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_31}
                      name="extrusion_form_column_31"
                      error={!!touched.extrusion_form_column_31 && !!errors.extrusion_form_column_31}
                      helperText={touched.extrusion_form_column_31 && errors.extrusion_form_column_31}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="濾網壓力(設定)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_32}
                      name="extrusion_form_column_32"
                      error={!!touched.extrusion_form_column_32 && !!errors.extrusion_form_column_32}
                      helperText={touched.extrusion_form_column_32 && errors.extrusion_form_column_32}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="濾網壓力(實際)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_33}
                      name="extrusion_form_column_33"
                      error={!!touched.extrusion_form_column_33 && !!errors.extrusion_form_column_33}
                      helperText={touched.extrusion_form_column_33 && errors.extrusion_form_column_33}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="溫度變化曲線圖"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_35}
                      name="extrusion_form_column_35"
                      error={!!touched.extrusion_form_column_35 && !!errors.extrusion_form_column_35}
                      helperText={touched.extrusion_form_column_35 && errors.extrusion_form_column_35}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="擠出後尺寸 (mm)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_36}
                      name="extrusion_form_column_36"
                      error={!!touched.extrusion_form_column_36 && !!errors.extrusion_form_column_36}
                      helperText={touched.extrusion_form_column_36 && errors.extrusion_form_column_36}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="1 擠出尺寸 / 數量"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_37}
                      name="extrusion_form_column_37"
                      error={!!touched.extrusion_form_column_37 && !!errors.extrusion_form_column_37}
                      helperText={touched.extrusion_form_column_37 && errors.extrusion_form_column_37}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="2 擠出尺寸 / 數量"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_38}
                      name="extrusion_form_column_38"
                      error={!!touched.extrusion_form_column_38 && !!errors.extrusion_form_column_38}
                      helperText={touched.extrusion_form_column_38 && errors.extrusion_form_column_38}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="3 擠出尺寸 / 數量"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_39}
                      name="extrusion_form_column_39"
                      error={!!touched.extrusion_form_column_39 && !!errors.extrusion_form_column_39}
                      helperText={touched.extrusion_form_column_39 && errors.extrusion_form_column_39}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="4 擠出尺寸 / 數量"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_40}
                      name="extrusion_form_column_40"
                      error={!!touched.extrusion_form_column_40 && !!errors.extrusion_form_column_40}
                      helperText={touched.extrusion_form_column_40 && errors.extrusion_form_column_40}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="重量"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_41}
                      name="extrusion_form_column_41"
                      error={!!touched.extrusion_form_column_41 && !!errors.extrusion_form_column_41}
                      helperText={touched.extrusion_form_column_41 && errors.extrusion_form_column_41}
                      sx={{ gridColumn: "span 1" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="重量二"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.extrusion_form_column_42}
                      name="extrusion_form_column_42"
                      error={!!touched.extrusion_form_column_42 && !!errors.extrusion_form_column_42}
                      helperText={touched.extrusion_form_column_42 && errors.extrusion_form_column_42}
                      sx={{ gridColumn: "span 1" }}
                    />
                </Box>
              </Box>
            )}
              
            {/* --------------------------車床部主管填寫-------------------------------- */}     
            {carBed && (
              <Box>
                <br></br>
                <hr></hr>
                <br></br>
                <Header title="車床表單" subtitle="車床部主管填寫" />
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="研磨日期"
                      inputFormat="YYYY/MM/DD"
                      value={lathe_form_column_1_value||values.lathe_form_column_1}
                      name="lathe_form_column_1"
                      onChange={(newValue) => {
                        set_lathe_form_column_1_value(newValue);
                        values.lathe_form_column_1 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.lathe_form_column_1 && !!errors.lathe_form_column_1}
                      helperText={touched.lathe_form_column_1 && errors.lathe_form_column_1}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="研磨機台"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_2}
                      name="lathe_form_column_2"
                      error={!!touched.lathe_form_column_2 && !!errors.lathe_form_column_2}
                      helperText={touched.lathe_form_column_2 && errors.lathe_form_column_2}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="研磨人員"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_3}
                      name="lathe_form_column_3"
                      error={!!touched.lathe_form_column_3 && !!errors.lathe_form_column_3}
                      helperText={touched.lathe_form_column_3 && errors.lathe_form_column_3}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="研磨 前尺寸"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_4}
                      name="lathe_form_column_4"
                      error={!!touched.lathe_form_column_4 && !!errors.lathe_form_column_4}
                      helperText={touched.lathe_form_column_4 && errors.lathe_form_column_4}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="研磨 後尺寸"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_5}
                      name="lathe_form_column_5"
                      error={!!touched.lathe_form_column_5 && !!errors.lathe_form_column_5}
                      helperText={touched.lathe_form_column_5 && errors.lathe_form_column_5}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="走粉日期"
                      inputFormat="YYYY/MM/DD"
                      value={lathe_form_column_6_value||values.lathe_form_column_6}
                      name="lathe_form_column_6"
                      onChange={(newValue) => {
                        set_lathe_form_column_6_value(newValue);
                        values.lathe_form_column_6 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.lathe_form_column_6 && !!errors.lathe_form_column_6}
                      helperText={touched.lathe_form_column_6 && errors.lathe_form_column_6}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="走粉機台"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_7}
                      name="lathe_form_column_7"
                      error={!!touched.lathe_form_column_7 && !!errors.lathe_form_column_7}
                      helperText={touched.lathe_form_column_7 && errors.lathe_form_column_7}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="走粉人員"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_8}
                      name="lathe_form_column_8"
                      error={!!touched.lathe_form_column_8 && !!errors.lathe_form_column_8}
                      helperText={touched.lathe_form_column_8 && errors.lathe_form_column_8}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="走粉前尺寸"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_9}
                      name="lathe_form_column_9"
                      error={!!touched.lathe_form_column_9 && !!errors.lathe_form_column_9}
                      helperText={touched.lathe_form_column_9 && errors.lathe_form_column_9}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="走粉後尺寸"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_10}
                      name="lathe_form_column_10"
                      error={!!touched.lathe_form_column_10 && !!errors.lathe_form_column_10}
                      helperText={touched.lathe_form_column_10 && errors.lathe_form_column_10}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      variant="filled"
                      label="QC日期"
                      inputFormat="YYYY/MM/DD"
                      value={lathe_form_column_11_value||values.lathe_form_column_11}
                      name="lathe_form_column_11"
                      onChange={(newValue) => {
                        set_lathe_form_column_11_value(newValue);
                        values.lathe_form_column_11 = newValue.$d.toDateString()
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={!!touched.lathe_form_column_11 && !!errors.lathe_form_column_11}
                      helperText={touched.lathe_form_column_11 && errors.lathe_form_column_11}
                      sx={{ gridColumn: "span 1" }}
                    />
                  </LocalizationProvider>
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="QC判定"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_12}
                      name="lathe_form_column_12"
                      error={!!touched.lathe_form_column_12 && !!errors.lathe_form_column_12}
                      helperText={touched.lathe_form_column_12 && errors.lathe_form_column_12}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="備註"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lathe_form_column_13}
                      name="lathe_form_column_13"
                      error={!!touched.lathe_form_column_13 && !!errors.lathe_form_column_13}
                      helperText={touched.lathe_form_column_13 && errors.lathe_form_column_13}
                      sx={{ gridColumn: "span 2" }}
                    />
                </Box>

              </Box>
            )}
              
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                提交
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>

      {/* display old rework detail */}
      <br/>
      <hr/>
      <Box
        m="40px 0 0 0"
        height="26vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={destructData(dataCollection)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  category_name: yup.string().required("required"),
  order_id: yup.string().required("required"),
  expect_delivery_date: yup.string().required("required"),
  rework_quantity: yup.string().required("required"),
});

let initialValues = {
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

function destructData(data) {
  let dataList = [];
  data.forEach(element => {
      let {id, values:{
        order_id, order_date, return_date, order_type, customer_name, rework_quantity,
        product_name, product_specification, return_reason
      }}=element
      dataList.push({id:id, order_id:order_id, order_date:order_date,
        return_date:return_date,order_type:order_type, customer_name:customer_name,
        rework_quantity:rework_quantity,product_name:product_name,
        product_specification:product_specification,return_reason:return_reason});
  });
  return dataList;
}

