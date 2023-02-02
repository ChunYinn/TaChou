import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import { collection, query, where, getCountFromServer, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

let count = 0;
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //usestate store values for stat
  const [numReworks, setNumReworks] = useState(0);
  const [numIncompleteReworks, setnumIncompleteReworks] = useState(0);
  const [IncompleteFactor, setIncompleteFactor] = useState(0);
  const [numLastReworks, setNumLastReworks] = useState(0);

  //cureent month / year 
  const currentMonth = String(new Date().getMonth() + 1);
  const currentYear = new Date().getFullYear();
  let YearWmonth;
  if (currentMonth < 10){
    YearWmonth = `${currentYear}0${currentMonth}`
  } else {
    YearWmonth = `${currentYear}${currentMonth}`
  };

  //check is numeric
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  //Fetch GetReworkMonthly
  useEffect(()=>{
    const GetReworkMonthly = async()=>{
      try {
        let num = 0;
        const q = query(collection(db, "Reworks"), where("timeStamp", ">=", YearWmonth));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc)=>{
          if (doc.data().values.rework_quantity !== "" && containsOnlyNumbers(doc.data().values.rework_quantity)) {
            num += Number(doc.data().values.rework_quantity)
          }
        })
        setNumReworks(num)
      } catch (error) {
        console.log(error);
      }
    }
    GetReworkMonthly();
    console.log(count++);
  },[numReworks, YearWmonth])


  // //fetch last month reworks
  // let lastMonth, lastYear;
  // if (currentMonth === 1) {
  //   lastMonth = 12;
  //   lastYear = currentYear - 1;
  // } else {
  //   lastMonth = currentMonth-1;
  //   lastYear = currentYear;
  // }
  // console.log("lastmonth"+lastMonth)
  // console.log("lastyear"+lastYear)

  // let lastMonthDays;
  // if (lastMonth === 2) {
  //   lastMonthDays = lastYear % 4 === 0 ? 29 : 28;
  // } else if ([4, 6, 9, 11].includes(lastMonth)) {
  //   lastMonthDays = 30;
  // } else {
  //   lastMonthDays = 31;
  // }
  // console.log("lastMonthDays"+lastMonthDays)
  // const lastMonthWithYear = lastMonth < 10 ? `${lastYear}0${lastMonth}` : `${lastYear}${lastMonth}`;


  // useEffect(()=>{
  //   const GetReworkLastMonthly = async()=>{
  //     try {
  //       let num = 0;
  //       const lastMonthWithYear = lastMonth < 10 ? `${lastYear}0${lastMonth}` : `${lastYear}${lastMonth}`;
  //       const startAt = Number(lastMonthWithYear);
  //       console.log("start"+startAt)
  //       const endAt = Number(lastYear + (lastMonth < 10 ? "0" + lastMonth : lastMonth) + (lastMonthDays < 10 ? "0" + lastMonthDays : lastMonthDays)+"000000");
  //       console.log("end"+endAt)
  //       const q = query(collection(db, "Reworks"), (doc) => {
  //         return doc.data().timeStamp >= startAt && Number(doc.data().timeStamp) < endAt;
  //       });
  //       const snapshot = await getDocs(q);
  //       snapshot.forEach((doc)=>{
  //         if (doc.data().values.rework_quantity !== "" && containsOnlyNumbers(doc.data().values.rework_quantity)) {
  //           num += Number(doc.data().values.rework_quantity)
  //         }
  //       })
  //       setNumLastReworks(num)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   GetReworkLastMonthly();
  //   console.log(count++);
  // },[numLastReworks, lastMonthWithYear])
  

  //fetch incomplete reworks
  useEffect(()=>{
    const GetIncompleteReworks = async()=>{
      try {
        let num = 0;
        const q = query(collection(db, "Reworks"), where("values.rework_complete_date", "==", ""));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc)=>{
          if (doc.data().values.rework_quantity !== "" &&　containsOnlyNumbers(doc.data().values.rework_quantity)) {
            num += Number(doc.data().values.rework_quantity)
          }
        })
        setnumIncompleteReworks(num)
      } catch (error) {
        console.log(error);
      }
    }
    GetIncompleteReworks();
  },[numIncompleteReworks])

  //fetch 品管未審核原因的重工
  //fetch incomplete reworks
  useEffect(()=>{
    const GetIncompleteFactor = async()=>{
      try {
        let num = 0;
        const q = query(collection(db, "Reworks"), where("values.factor_name", "==", ""));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc)=>{
          num += 1

        })
        setIncompleteFactor(num)
      } catch (error) {
        console.log(error);
      }
    }
    GetIncompleteFactor();
  },[IncompleteFactor])


  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="主頁面" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numReworks}
            subtitle="本月重工隻數"
            progress="0.75"
            // increase="+14%"
            icon={
              <ConstructionRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numIncompleteReworks}
            subtitle="還未完成重工隻數"
            progress="0.70"
            // increase="+21%"
            icon={
              <ErrorOutlineRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={IncompleteFactor}
            subtitle="還未審核重工筆數"
            progress="0.30"
            // increase="+5%"
            icon={
              <AssignmentLateIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numLastReworks}
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                每部門
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                每月重工支數  
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* ------------------------------------------------- */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            color={colors.greenAccent[500]}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            前五大重工原因比例
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;
