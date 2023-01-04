import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
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
          <form onSubmit={handleSubmit}>
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
                label="重工類型"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category_name}
                name="category_name"
                error={!!touched.category_name && !!errors.category_name}
                helperText={touched.category_name && errors.category_name}
                sx={{ gridColumn: "span 1" }}
              />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="退貨日期"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.return_date}
                name="return_date"
                error={!!touched.return_date && !!errors.return_date}
                helperText={touched.return_date && errors.return_date}
                sx={{ gridColumn: "span 1" }}
              />
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
                label="訂單日期"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_date}
                name="order_date"
                error={!!touched.order_date && !!errors.order_date}
                helperText={touched.order_date && errors.order_date}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="預計交貨日"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expect_delivery_date}
                name="expect_delivery_date"
                error={!!touched.expect_delivery_date && !!errors.expect_delivery_date}
                helperText={touched.expect_delivery_date && errors.expect_delivery_date}
                sx={{ gridColumn: "span 1" }}
              />
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                提交
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  category_name: yup.string().required("required"),
  order_id: yup.string().required("required"),
  expect_delivery_date: yup.string().required("required"),
  rework_quantity: yup.string().required("required"),
});
const initialValues = {
  category_name: "",
  return_id: "",
  return_date: "",
  return_reason: "",
  order_id: "",
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
};

export default Form;
