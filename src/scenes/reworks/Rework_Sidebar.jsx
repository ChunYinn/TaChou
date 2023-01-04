import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

const Rework_Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box 
            sx={{
                "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                color: "#6870fa !important",
                },
          }}
        >
            <ProSidebar>
                <Box paddingLeft={"10%"}>
                    <Item 
                        title="案件"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                    >
                       改善流程 
                    </Typography>
                    <Item
                        title="原料"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="包膠"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="擠料"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="車床"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </ProSidebar>

        </Box>
    )
};

export default Rework_Sidebar;