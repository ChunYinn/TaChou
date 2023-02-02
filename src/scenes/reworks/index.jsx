import ReworkDetail from "./reworkSpecific";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
let count = 0
const Reworks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [dataCollection, setDataCollection] = useState([]);
  const [toReworkSpecific, setToReworkSpecific] = useState(false);
  const [restart, setRestart] = useState(0)
  
  //for delete
  const [hoveredRow, setHoveredRow] = useState(null);

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };
 //-----------------------
    
  useEffect(()=>{
    (async()=>{
      let dataList = []
      try {
        const querySnapshot = await getDocs(collection(db, "Reworks"));
        querySnapshot.forEach((doc) => {
          dataList.push({id:doc.id, ...doc.data()})
        })
      } catch (error) {
        console.log(error);
      }
      setDataCollection(dataList);
      

      count++;
      console.log("run: "+count);
    })();  
  }, [restart]);

  function destructData(data) {
    let dataList = [];
    data.forEach(element => {
        let {id, values:{
          order_id, order_date, return_date, order_type, customer_name, rework_quantity,
          product_name, product_specification, factor_name, department_name
        }}=element


        const formattedOrderDate = new Date(order_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });

        const formattedReturnDate = new Date(return_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });

        dataList.push({id:id, order_id:order_id, order_date:formattedOrderDate,
          return_date:formattedReturnDate,order_type:order_type, customer_name:customer_name,
          rework_quantity:rework_quantity,product_name:product_name,
          product_specification:product_specification,factor_name:factor_name, department_name:department_name});
    });
    return dataList;
  }


  const columns = [
    { field: "id", headerName: "重工編號",flex:1,},
    { field: "order_id", headerName: "排程單號",flex:1 },
    { field: "order_date", headerName: "訂單日期",flex:1 },
    { field: "return_date", headerName: "退貨日期",flex:1 },
    { field: "order_type", headerName: "類別",flex:0.5 },
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
      align: "left",
    },
    {
      field: "product_specification",
      headerName: "產品規格",
      flex: 1,
    },
    {
      field: "factor_name",
      headerName: "重工原因",
      flex: 1,
    },
    {
      field: "department_name",
      headerName: "責任部門",
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field:"actions",
      headerName:"",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton onClick={
                () => {
                  navigate(`/reworks/${hoveredRow}`);
                  setToReworkSpecific(true);
                }
              }>
                <EditIcon />
              </IconButton>
              <IconButton type="button" onClick={
                async() => {
                  await deleteDoc(doc(db, "Reworks", hoveredRow))
                  setRestart(restart+1)
                  }
                
                }>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        } else return null;
      }
    }
  ];

  //for useparam
  const delay = ms => new Promise(
    resolve=> setTimeout(resolve, ms)
  )
  const { id } = useParams();

  useEffect(()=>{
    if(!id){
      delay(1000)
      setToReworkSpecific(false)
      delay(1000)
    }
  },[])



  return (
    <Box m="20px">
      {toReworkSpecific ? <ReworkDetail id={id}/> :
      <div>
        <Header
        title="重工總表"
        subtitle="若[責任部門]空欄，請品管審核此案件"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          // initialState={{ pinnedColumns: { right: ["actions"] } }}
          componentsProps={{
            row:{
              onMouseEnter: onMouseEnterRow,
              onMouseLeave: onMouseLeaveRow
            }
          }}

        />
      </Box>
        </div>
      }
      
    </Box>
  );
};

export default Reworks;
