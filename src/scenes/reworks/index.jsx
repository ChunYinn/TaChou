import ReworkDetail from "./reworkSpecific";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const Reworks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [dataCollection, setDataCollection] = useState([]);
  const [toReworkSpecific, setToReworkSpecific] = useState(false);
  
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
    })();  
  }, [dataCollection]);

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

  // console.log(destructData(dataCollection));

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

  const { id } = useParams();
  // setReworkId(id);

  return (
    <Box m="20px">
      {toReworkSpecific ? <ReworkDetail id={id}/> :
      <div>
        <Header
        title="重工總表"
        subtitle="List of reworks for Future Reference"
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
          initialState={{ pinnedColumns: { right: ["actions"] } }}
          componentsProps={{
            row:{
              onMouseEnter: onMouseEnterRow,
              onMouseLeave: onMouseLeaveRow
            }
          }}
          // onRowClick={(params) => {
          //   navigate(`/reworks/${params.row.id}`);
          //   setToReworkSpecific(true);
          // }}
        />
      </Box>
        </div>
      }
      
    </Box>
  );
};

export default Reworks;
