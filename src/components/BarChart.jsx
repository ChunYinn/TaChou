import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [january, setJanuary] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [febuary, setfebuary] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [march, setmarch] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [april, setapril] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [may, setmay] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [june, setjune] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [july, setjuly] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [august, setaugust] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [september, setseptember] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [october, setoctober] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [november, setnovember] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});
  const [december, setdecember] = useState({inner:0,yuanLiao:0,baoJiao:0,carBed:0,iron:0,pinQuan:0});


  //current year 
  const currentYear = new Date().getFullYear();

  //Month 1
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}01`)){count6++}
        });
        //---------------
        setJanuary({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[january,currentYear])

  //Month 2
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}02`)){count6++}
        });
        //---------------
        setfebuary({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[febuary,currentYear])
  
  //Month 3
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}03`)){count6++}
        });
        //---------------
        setmarch({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[march,currentYear])

  //Month 4
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}04`)){count6++}
        });
        //---------------
        setapril({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[april,currentYear])

  //Month 5
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}05`)){count6++}
        });
        //---------------
        setmay({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[may,currentYear])

  //Month 6
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}06`)){count6++}
        });
        //---------------
        setjune({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[june,currentYear])

  //Month 7
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}07`)){count6++}
        });
        //---------------
        setjuly({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[july,currentYear])

  //Month 8
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}08`)){count6++}
        });
        //---------------
        setaugust({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[august,currentYear])

  //Month 9
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}09`)){count6++}
        });
        //---------------
        setseptember({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6});
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[september,currentYear])

  //Month 10
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}10`)){count6++}
        });
        //---------------
        setoctober({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[october,currentYear])

  //Month 11
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}11`)){count6++}
        });
        //---------------
        setnovember({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6})
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[november,currentYear])

  //Month 12
  useEffect(()=>{
    const barChartData1 = async()=>{
      try {
        const q1 = query(collection(db, "Reworks"), where("values.department_name", "==", "內部"));
        const q2 = query(collection(db, "Reworks"), where("values.department_name", "==", "原料部"));
        const q3 = query(collection(db, "Reworks"), where("values.department_name", "==", "包膠部"));
        const q4 = query(collection(db, "Reworks"), where("values.department_name", "==", "車床部"));
        const q5 = query(collection(db, "Reworks"), where("values.department_name", "==", "鐵材部"));
        const q6 = query(collection(db, "Reworks"), where("values.department_name", "==", "品管部"));
        //-------------
        let count1=0;
        const snapshot1 = await getDocs(q1);
        snapshot1.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count1++}
        });
        //-------------------
        let count2=0;
        const snapshot2 = await getDocs(q2);
        snapshot2.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count2++}
        });
        //-------------------
        let count3=0;
        const snapshot3 = await getDocs(q3);
        snapshot3.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count3++}
        });
        //-------------------
        let count4=0;
        const snapshot4 = await getDocs(q4);
        snapshot4.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count4++}
        });
        //-------------------
        let count5=0;
        const snapshot5 = await getDocs(q5);
        snapshot5.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count5++}
        });
        //---------------
        let count6=0;
        const snapshot6 = await getDocs(q6);
        snapshot6.forEach(doc => {
          if(doc.data().timeStamp.startsWith(`${currentYear}12`)){count6++}
        });
        //---------------
        setdecember({inner:count1,yuanLiao:count2,baoJiao:count3,carBed:count4,iron:count5,pinQuan:count6});
      } catch (error) {
        console.log(error);
      }
    }
    barChartData1();
  },[december,currentYear])


  const data = [
    {
      month: "一月",
      "內部": january.inner,
      "原料部": january.yuanLiao,
      "包膠部": january.baoJiao,
      "車床部": january.carBed,
      "鐵材部": january.iron,
      "品管部": january.pinQuan,
    },
    {
      month: "二月",
      "內部": febuary.inner,
      "原料部": febuary.yuanLiao,
      "包膠部": febuary.baoJiao,
      "車床部": febuary.carBed,
      "鐵材部": febuary.iron,
      "品管部": febuary.pinQuan,
    },
    {
      month: "三月",
      "內部": march.inner,
      "原料部": march.yuanLiao,
      "包膠部": march.baoJiao,
      "車床部": march.carBed,
      "鐵材部": march.iron,
      "品管部": march.pinQuan,
    },
    {
      month: "四月",
      "內部": april.inner,
      "原料部": april.yuanLiao,
      "包膠部": april.baoJiao,
      "車床部": april.carBed,
      "鐵材部": april.iron,
      "品管部": april.pinQuan,
    },
    {
      month: "五月",
      "內部": may.inner,
      "原料部": may.yuanLiao,
      "包膠部": may.baoJiao,
      "車床部": may.carBed,
      "鐵材部": may.iron,
      "品管部": may.pinQuan,
    },
    {
      month: "六月",
      "內部": june.inner,
      "原料部": june.yuanLiao,
      "包膠部": june.baoJiao,
      "車床部": june.carBed,
      "鐵材部": june.iron,
      "品管部": june.pinQuan,
    },
    {
      month: "七月",
      "內部": july.inner,
      "原料部": july.yuanLiao,
      "包膠部": july.baoJiao,
      "車床部": july.carBed,
      "鐵材部": july.iron,
      "品管部": july.pinQuan,
    },
    {
      month: "八月",
      "內部": august.inner,
      "原料部": august.yuanLiao,
      "包膠部": august.baoJiao,
      "車床部": august.carBed,
      "鐵材部": august.iron,
      "品管部": august.pinQuan,
    },
    {
      month: "九月",
      "內部": september.inner,
      "原料部": september.yuanLiao,
      "包膠部": september.baoJiao,
      "車床部": september.carBed,
      "鐵材部": september.iron,
      "品管部": september.pinQuan,
    },
    {
      month: "十月",
      "內部": october.inner,
      "原料部": october.yuanLiao,
      "包膠部": october.baoJiao,
      "車床部": october.carBed,
      "鐵材部": october.iron,
      "品管部": october.pinQuan,
    },
    {
      month: "十一月",
      "內部": november.inner,
      "原料部": november.yuanLiao,
      "包膠部": november.baoJiao,
      "車床部": november.carBed,
      "鐵材部": november.iron,
      "品管部": november.pinQuan,
    },
    {
      month: "十二月",
      "內部": december.inner,
      "原料部": december.yuanLiao,
      "包膠部": december.baoJiao,
      "車床部": december.carBed,
      "鐵材部": december.iron,
      "品管部": december.pinQuan,
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["內部", "鐵材部", "原料部", "包膠部", "車床部", "品管部"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      fill={[
        {match:{
            id:"車床部"
          },
          id: 'dots'
        }
        ]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "月份", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        format: e=> Math.floor(e) === e && e,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "各部門重工數量", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      // isInteractive={true}
      // tooltip={(value)=>{
      //   return <div>{value.data}</div>
      // }}
      
      
    
      animate={true}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
