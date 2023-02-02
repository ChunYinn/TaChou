import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //1 Set empty listFactorsQuantity
  const [listFactorsQuantity, setListFactorsQuantity] = useState(0);

  //2 Get this year each document from Reworks db
  //current year 
  const currentYear = new Date().getFullYear();

  //check is numeric
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  useEffect(() => {
    try {
      let listFactorsQuantity = [];
      getDocs(collection(db, "Reworks"), where("timeStamp", ">=", currentYear))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            const factorName = doc.data().values.factor_name;
            const reworkQuantity = Number(doc.data().values.rework_quantity);

          if (factorName !== "" && containsOnlyNumbers(reworkQuantity)) {
            let factorIndex = listFactorsQuantity.findIndex(
              (item) => item[0] === factorName
            );
            // If factor in document is not inside list then push into list
            if (factorIndex === -1) {
              listFactorsQuantity.push([factorName, reworkQuantity]);

              // Else if factor in document is inside list then add quantity into that factor
            } else {
              listFactorsQuantity[factorIndex][1] += reworkQuantity;
            }
          }
          setListFactorsQuantity(listFactorsQuantity);
          
          });
          //3 Decending order of list by quantity
          listFactorsQuantity.sort(function(a, b) {
            return b[1] - a[1];
          });
          setListFactorsQuantity(listFactorsQuantity);
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentYear]);

  console.log(listFactorsQuantity);

  //Example of listFactorsQuantity
  //0: ['硬度高', 23]
  // 1: ['拿錯鐵輪', 14]
  // 2: ['膠面白點', 5]
  
  const data = [];
  for (let i = 0; i < 5; i++) {
    if (listFactorsQuantity[i]) {
      data.push({
        id: listFactorsQuantity[i][0],
        label: listFactorsQuantity[i][0],
        value: listFactorsQuantity[i][1],
        color: `hsl(${104 + 58 * i}, 70%, 50%)`,
      });
    } else {
      data.push({
        id: "無",
        label: "無",
        value: 0,
        color: `hsl(${104 + 58 * i}, 70%, 50%)`,
      });
    }
  }


  return (
    <ResponsivePie
      data={data}
      theme={{
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
