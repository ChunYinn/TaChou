import {useState, useEffect} from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dataCollection, setDataCollection] = useState([]);

  useEffect(()=>{
    (async()=>{
      let dataList = []
      try {
        const querySnapshot = await getDocs(collection(db, "Team"));
        querySnapshot.forEach((doc) => {
          dataList.push({id:doc.id, ...doc.data()})
        })
      } catch (error) {
        console.log(error);
      }
      setDataCollection(dataList);
    })();  
  }, []);
  console.log(dataCollection);



  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "employee_name",
      headerName: "姓名",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "department_name",
      headerName: "部門",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "position",
      headerName: "職位",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="管理人員" subtitle="Managing the Team Members" />
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
        }}
      >
        <DataGrid checkboxSelection rows={dataCollection} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
