import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDatareworks } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

const Reworks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, render:rowData=> <Link href="/">{rowData.id}</Link>},
    { field: "return_date", headerName: "日期" },
    {
      field: "customer_name",
      headerName: "客戶",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "product_name",
      headerName: '品名',
      flex: 1,
    },
    {
      field: "rework_quantity",
      headerName: "數量",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "product_specification",
      headerName: "規格",
      flex: 1,
    },
    {
      field: "product_color",
      headerName: "顏色",
      flex: 1,
    },
    {
      field: "factor_name",
      headerName: "重工原因",
      flex: 1,
    },
    {
      field: "department_name",
      headerName: "責任單位",
      flex: 1,
    },
  ];


  return (
    <Box m="20px">
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
          rows={mockDatareworks}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            navigate(`/rework/id/${params.row.id}`);
          }}
        />
      </Box>
    </Box>
  );
};

export default Reworks;
